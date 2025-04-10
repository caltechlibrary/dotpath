//
// dotpath.ts module provides a convient way of mapping JSON dot path notation when working
// with objects and maps.
//
// @author R. S. Doiel, <rsdoiel@caltech.edu>
//
// Copyright (c) 2025, Caltech
// All rights not granted herein are expressly reserved by Caltech.
//
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
export function getDotpath(obj: any, path: string): [any, boolean] {
    /**
     * Fetches a value from a nested dictionary or object using a dot-notated path expression.
     * Supports list indices in the path with bracket notation.
     *
     * @param obj - The dictionary or object to traverse.
     * @param path - The dot-notated path expression, with list indices in square brackets.
     * @returns A tuple containing the value and a boolean status (OK).
     */
    const pattern = /(\w+)|\[(\d+)\]/g;
    let match;
    let current = obj;

    while ((match = pattern.exec(path)) !== null) {
        const dictKey = match[1];
        const listIndex = match[2];

        if (dictKey) {
            // Handle dictionary key
            if (current && typeof current === 'object' && dictKey in current) {
                current = current[dictKey];
            } else {
                return [null, false];
            }
        } else if (listIndex !== undefined) {
            // Handle list index
            const index = parseInt(listIndex, 10);
            if (Array.isArray(current) && index >= 0 && index < current.length) {
                current = current[index];
            } else {
                return [null, false];
            }
        }
    }

    return [current, true];
}

export function hasDotpath(obj: any, path: string): boolean {
    /**
     * Checks if a path exists in a nested dictionary or object using a dot-notated path expression.
     *
     * @param obj - The dictionary or object to traverse.
     * @param path - The dot-notated path expression, with list indices in square brackets.
     * @returns True if the path exists, False otherwise.
     */
    const [, ok] = getDotpath(obj, path);
    return ok;
}

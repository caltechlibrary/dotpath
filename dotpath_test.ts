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
import { getDotpath, hasDotpath } from './dotpath.ts';

function runTests() {
    const data = {
        user: {
            profile: {
                name: "Alice",
                hobbies: ["reading", "hiking", "coding"]
            },
            settings: {
                notifications: ["email", "sms"],
                theme: "dark"
            }
        },
        stats: [
            { metric: "visits", value: 1000 },
            { metric: "signups", value: 250 }
        ]
    };

    // Test cases for getDotpath
    const getTestCases = [
        { path: "user.profile.name", expected: "Alice" },
        { path: "user.profile.hobbies[1]", expected: "hiking" },
        { path: "user.settings.notifications[0]", expected: "email" },
        { path: "user.settings.theme", expected: "dark" },
        { path: "stats[1].value", expected: 250 },
        { path: "stats[0].metric", expected: "visits" },
        { path: "user.profile.age", expected: null },       // Non-existent key
        { path: "stats[2].metric", expected: null }         // Index out of range
    ];

    for (const { path, expected } of getTestCases) {
        const [result, ok] = getDotpath(data, path);
        console.assert(result === expected, `Test failed for path '${path}': expected ${expected}, got ${result}`);
        console.log(`Test passed for path '${path}': ${result}, OK: ${ok}`);
    }

    // Test cases for hasDotpath
    const hasTestCases = [
        { path: "user.profile.name", expected: true },
        { path: "user.profile.hobbies[1]", expected: true },
        { path: "user.settings.notifications[0]", expected: true },
        { path: "user.settings.theme", expected: true },
        { path: "stats[1].value", expected: true },
        { path: "stats[0].metric", expected: true },
        { path: "user.profile.age", expected: false },      // Non-existent key
        { path: "stats[2].metric", expected: false },       // Index out of range
        { path: "user.profile.hobbies[3]", expected: false } // Index out of range
    ];

    for (const { path, expected } of hasTestCases) {
        const result = hasDotpath(data, path);
        console.assert(result === expected, `Test failed for path '${path}': expected ${expected}, got ${result}`);
        console.log(`Test passed for path '${path}': OK: ${result}`);
    }
}

runTests();

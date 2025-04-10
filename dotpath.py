#
#  dotpath.py package provides a convient way of mapping JSON dot path notation when working
#  with dictionaries.
# 
#  @author R. S. Doiel, <rsdoiel@caltech.edu>
# 
#  Copyright (c) 2025, Caltech
#  All rights not granted herein are expressly reserved by Caltech.
# 
#  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
# 
#  1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
# 
#  2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
# 
#  3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
# 
#  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
# 
import re

def getDotpath(obj, path):
    """
    Fetches a value from a nested dictionary or object using a dot-notated path expression.
    Supports list indices in the path with bracket notation.

    Args:
    - obj (dict or object): The dictionary or object to traverse.
    - path (str): The dot-notated path expression, with list indices in square brackets.

    Returns:
    - tuple: A tuple containing the value and a boolean status (OK).
    """
    # Use regex to split the path into keys and list indices
    pattern = re.compile(r'(\w+)|\[(\d+)\]')
    keys = pattern.findall(path)

    current = obj

    for key_group in keys:
        dict_key, list_index = key_group

        if dict_key:
            # Handle dictionary key
            if isinstance(current, dict) and dict_key in current:
                current = current[dict_key]
            else:
                return None, False
        elif list_index is not None:
            # Handle list index
            index = int(list_index)
            if isinstance(current, list) and 0 <= index < len(current):
                current = current[index]
            else:
                return None, False

    return current, True

def hasDotpath(obj, path):
    """
    Checks if a path exists in a nested dictionary or object using a dot-notated path expression.

    Args:
    - obj (dict or object): The dictionary or object to traverse.
    - path (str): The dot-notated path expression, with list indices in square brackets.

    Returns:
    - bool: True if the path exists, False otherwise.
    """
    value, ok = getDotpath(obj, path)
    return ok

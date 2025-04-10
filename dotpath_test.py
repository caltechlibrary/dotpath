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
from dotpath import getDotpath, hasDotpath

def run_tests():
    data = {
        "user": {
            "profile": {
                "name": "Alice",
                "hobbies": ["reading", "hiking", "coding"]
            },
            "settings": {
                "notifications": ["email", "sms"],
                "theme": "dark"
            }
        },
        "stats": [
            {"metric": "visits", "value": 1000},
            {"metric": "signups", "value": 250}
        ]
    }

    # Test cases for getDotpath
    get_test_cases = [
        ("user.profile.name", "Alice"),
        ("user.profile.hobbies[1]", "hiking"),
        ("user.settings.notifications[0]", "email"),
        ("user.settings.theme", "dark"),
        ("stats[1].value", 250),
        ("stats[0].metric", "visits"),
        ("user.profile.age", None),       # Non-existent key
        ("stats[2].metric", None)         # Index out of range
    ]

    for path, expected_value in get_test_cases:
        result, ok = getDotpath(data, path)
        assert result == expected_value, f"Test failed for path '{path}': expected {expected_value}, got {result}"
        print(f"Test passed for path '{path}': {result}, OK: {ok}")

    # Test cases for hasDotpath
    has_test_cases = [
        ("user.profile.name", True),
        ("user.profile.hobbies[1]", True),
        ("user.settings.notifications[0]", True),
        ("user.settings.theme", True),
        ("stats[1].value", True),
        ("stats[0].metric", True),
        ("user.profile.age", False),      # Non-existent key
        ("stats[2].metric", False),       # Index out of range
        ("user.profile.hobbies[3]", False) # Index out of range
    ]

    for path, expected_ok in has_test_cases:
        result = hasDotpath(data, path)
        assert result == expected_ok, f"Test failed for path '{path}': expected {expected_ok}, got {result}"
        print(f"Test passed for path '{path}': OK: {result}")

if __name__ == "__main__":
    run_tests()

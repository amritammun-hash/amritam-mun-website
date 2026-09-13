#!/bin/bash
OLD_BURGER='<div class="hamburger" id="hamburger">\n                <span class="bar"><\/span>\n                <span class="bar"><\/span>\n                <span class="bar"><\/span>\n            <\/div>'
NEW_BURGER='<div class="hamburger" id="hamburger">\n                <i class='\''bx bx-menu-alt-right'\''><\/i>\n            <\/div>'

# We use perl for multiline replace
perl -0777 -pi -e "s/<div class=\"hamburger\" id=\"hamburger\">\s*<span class=\"bar\"><\/span>\s*<span class=\"bar\"><\/span>\s*<span class=\"bar\"><\/span>\s*<\/div>/<div class=\"hamburger\" id=\"hamburger\">\n                <i class='bx bx-menu-alt-right'><\/i>\n            <\/div>/g" register.html procedure.html learn.html

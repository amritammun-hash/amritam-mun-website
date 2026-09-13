#!/bin/bash
OLD_STRING="<li style=\"position: relative; display: flex; flex-direction: column; align-items: center;\"><span style=\"position: absolute; top: -15px; font-size: 0.6rem; color: #ff8c00; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; white-space: nowrap; text-shadow: 0 0 5px rgba(255, 140, 0, 0.5);\">Early Bird Open<\/span><a href=\"register.html\" class=\"nav-link register-btn early-bird-btn\"><i class='bx bx-id-card'><\/i> Register<\/a><\/li>"
NEW_STRING="<li><a href=\"register.html\" class=\"nav-link nav-register-premium\"><i class='bx bx-id-card'><\/i> REGISTER <span class=\"premium-badge\">EARLY BIRD<\/span><\/a><\/li>"

for file in index.html register.html procedure.html learn.html; do
    sed -i '' "s|$OLD_STRING|$NEW_STRING|g" "$file"
done

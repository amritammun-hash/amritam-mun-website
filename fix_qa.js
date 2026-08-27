const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/<div class="qa-answer">\s*<p>/g, '<div class="qa-answer">\n                            <div class="qa-answer-inner">\n                                <p>');
content = content.replace(/<\/p>\s*<\/div>/g, '</p>\n                            </div>\n                        </div>');
fs.writeFileSync('index.html', content);

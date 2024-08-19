document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateEmails();
});

async function generateEmails() {
    const email = document.getElementById('email').value;
    const number = parseInt(document.getElementById('number').value);
    const errorElement = document.getElementById('error');
    const resultsElement = document.getElementById('results');
    const emailListElement = document.getElementById('emailList');

    errorElement.textContent = '';
    resultsElement.style.display = 'none';
    emailListElement.innerHTML = '';

    if (!isValidEmail(email)) {
        errorElement.textContent = 'Invalid email address.';
        return;
    }

    try {
        const [name, domain] = email.split('@');
        const aliases = await fetchAliases();
        const generatedEmails = generateAliases(name, domain, number, aliases);

        generatedEmails.forEach((email, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="email-text">${email}</span>
                <button class="copy-btn" data-email="${email}">Copy</button>
            `;
            emailListElement.appendChild(li);
        });

        resultsElement.style.display = 'block';
        addCopyListeners();
    } catch (error) {
        console.error('Error details:', error);
        errorElement.textContent = `An error occurred: ${error.message}. Check the console for more details.`;
    }
}

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function generateEmailVariations(name) {
    const variations = [name];
    for (let i = 1; i < name.length; i++) {
        const left = name.slice(0, i);
        const right = name.slice(i);
        generateEmailVariations(right).forEach(variation => {
            variations.push(left + '.' + variation);
        });
    }
    return variations;
}

function generateAliases(name, domain, number, aliases) {
    const variations = generateEmailVariations(name);
    const totalVariations = variations.length;
    
    const aliasNumber = Math.min(Math.floor(number / 2), Math.pow(2, name.length - 1));
    
    const result = [];
    
    // Generate email variations
    shuffleArray(variations);
    for (let i = 0; i < Math.min(Math.floor(number / 2), totalVariations); i++) {
        result.push(variations[i] + '@' + domain);
    }
    
    // Generate aliases
    shuffleArray(aliases);
    for (let i = 0; i < aliasNumber && i < aliases.length; i++) {
        result.push(name + '+' + aliases[i] + '@' + domain);
    }
    
    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function fetchAliases() {
    try {
        const response = await fetch('get_aliases.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const aliases = await response.json();
        if (!Array.isArray(aliases) || aliases.length === 0) {
            throw new Error('Invalid or empty aliases data');
        }
        return aliases;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(`Failed to fetch aliases: ${error.message}`);
    }
}

function addCopyListeners() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            copyToClipboard(email);
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = 'Copy';
            }, 2000);
        });
    });

    document.getElementById('copyAll').addEventListener('click', function() {
        const allEmails = Array.from(document.querySelectorAll('.email-text')).map(span => span.textContent).join('\n');
        copyToClipboard(allEmails);
        this.textContent = 'All Copied!';
        setTimeout(() => {
            this.textContent = 'Copy All';
        }, 2000);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
// To use this API, please turn on VPN and select Niederlands, you can download VPN free for your browser this: "https://chromewebstore.google.com/detail/vpn-freepro-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D1%8B%D0%B9-vp/bibjcjfmgapbfoljiojpipaooddpkpai?hl=ru"
class GeminiExtension {
    getInfo() {
        return {
            id: 'geminiAPI',
            name: 'Gemini API',
            blocks: [
                {
                    opcode: 'sendRequest',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Send to Gemini API: [REQUEST]',
                    arguments: {
                        REQUEST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, Gemini!'
                        }
                    }
                },
                {
                    opcode: 'forgetContext',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Forget Gemini Context'
                }
            ],
            menus: {}
        };
    }

    sendRequest(args) {
        const apiKey = 'AIzaSyAboOyfsbgVqI7jx57Y6DoDzb31KlY4wO0';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const requestBody = {
            contents: [{
                role: 'user',
                parts: [{
                    text: args.REQUEST
                }]
            }]
        };

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error('API request failed: ' + response.status + ' - ' + text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Gemini response:', data);
            if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            }
            return 'No valid response from Gemini';
        })
        .catch(error => {
            console.error('Gemini API error:', error);
            return 'Error: ' + error.message;
        });
    }

    forgetContext() {
        console.log('Gemini context reset (no history stored)');
        // Ничего не делаем, так как каждый запрос и так независимый
    }
}

Scratch.extensions.register(new GeminiExtension());
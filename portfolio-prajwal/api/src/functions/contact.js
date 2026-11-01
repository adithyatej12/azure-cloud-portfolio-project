const { app } = require('@azure/functions');

app.http('contact', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const data = await request.json();

            const name = data.name?.trim();
            const email = data.email?.trim();
            const subject = data.subject?.trim();
            const message = data.message?.trim();

            if (!name || !email || !subject || !message) {
                return {
                    status: 400,
                    jsonBody: {
                        success: false,
                        message: 'Please fill in all fields.'
                    }
                };
            }

            context.log(`Portfolio contact received from: ${name}`);
            context.log(`Email: ${email}`);
            context.log(`Subject: ${subject}`);
            context.log(`Message: ${message}`);

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    message: `Thank you, ${name}! Your message has been received.`
                }
            };

        } catch (error) {
            context.error('Error processing contact form:', error);

            return {
                status: 400,
                jsonBody: {
                    success: false,
                    message: 'Invalid request.'
                }
            };
        }
    }
});
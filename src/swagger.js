import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const serverUrl = `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BCA Clone API',
      version: '1.0.0',
      description: 'REST API documentation for BCA Clone backend (footer & news)',
    },
    servers: [{ url: serverUrl }],
    tags: [
      { name: 'Health', description: 'Health check' },
      { name: 'Footer', description: 'Footer information endpoints' },
      { name: 'News', description: 'News endpoints' },
    ],
    components: {
      schemas: {
        ContactInfo: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            address: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        ContactMethod: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            type: { type: 'string', enum: ['phone', 'email', 'whatsapp'] },
            label: { type: 'string' },
            value: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        SocialLink: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            platform: { type: 'string' },
            url: { type: 'string' },
            icon: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        QuickLink: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            label: { type: 'string' },
            url: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        PolicyLink: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            label: { type: 'string' },
            url: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        News: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            summary: { type: 'string' },
            imageUrl: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            featured: { type: 'boolean' },
          },
        },
        ApiError: {
          type: 'object',
          properties: { error: { type: 'string' } },
        },
      },
    },
    paths: {
      '/api/health': {
        get: {
          tags: ['Health'],
          summary: 'Health check',
          responses: {
            200: {
              description: 'Service is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      now: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/footer/contact': {
        get: {
          tags: ['Footer'],
          summary: 'Get contact info and methods',
          responses: {
            200: {
              description: 'Contact info',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      info: { $ref: '#/components/schemas/ContactInfo' },
                      methods: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ContactMethod' },
                      },
                    },
                  },
                },
              },
            },
            500: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          },
        },
      },
      '/api/footer/quicklinks': {
        get: {
          tags: ['Footer'],
          summary: 'Get quick links',
          responses: {
            200: {
              description: 'List of quick links',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/QuickLink' } },
                },
              },
            },
            500: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          },
        },
      },
      '/api/footer/social': {
        get: {
          tags: ['Footer'],
          summary: 'Get social links',
          responses: {
            200: {
              description: 'List of social links',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/SocialLink' } },
                },
              },
            },
            500: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          },
        },
      },
      '/api/footer/policy': {
        get: {
          tags: ['Footer'],
          summary: 'Get policy links',
          responses: {
            200: {
              description: 'List of policy links',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/PolicyLink' } },
                },
              },
            },
            500: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          },
        },
      },
      '/api/news': {
        get: {
          tags: ['News'],
          summary: 'Get news list',
          parameters: [
            { in: 'query', name: 'featured', schema: { type: 'boolean' }, description: 'Filter by featured' },
            { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Limit number of items' },
          ],
          responses: {
            200: {
              description: 'List of news items',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/News' } },
                },
              },
            },
            500: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
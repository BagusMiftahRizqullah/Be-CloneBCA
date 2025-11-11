import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
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
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Promo', description: 'Promo endpoints' },
      { name: 'Carousel', description: 'Carousel endpoints' },
      { name: 'Rates', description: 'Currency rates endpoints' },
      { name: 'Search', description: 'Search endpoints' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
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
        ValidationError: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  param: { type: 'string' },
                  location: { type: 'string' },
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Promo: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            imageUrl: { type: 'string' },
            periodFrom: { type: 'string', format: 'date-time' },
            periodTo: { type: 'string', format: 'date-time' },
            url: { type: 'string' },
            featured: { type: 'boolean' },
          },
        },
        CarouselSlide: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            imageUrl: { type: 'string' },
            href: { type: 'string' },
            order: { type: 'integer' },
          },
        },
        CurrencyRate: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            code: { type: 'string' },
            buy: { type: 'number' },
            sell: { type: 'number' },
            flagSrc: { type: 'string' },
          },
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
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password', 'name'],
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
            409: { description: 'Email exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
            500: { description: 'Server error' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: { email: { type: 'string' }, password: { type: 'string' } },
                },
              },
            },
          },
          responses: {
            200: { description: 'Logged in', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
            401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
            500: { description: 'Server error' },
          },
        },
      },
      '/api/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'User info', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'Not found' },
          },
        },
      },
      '/api/promos': {
        get: {
          tags: ['Promo'],
          summary: 'Get promos',
          responses: {
            200: { description: 'List of promos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Promo' } } } } },
            500: { description: 'Error' },
          },
        },
        post: {
          tags: ['Promo'],
          summary: 'Create promo',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Promo' } } } },
          responses: {
            201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Promo' } } } },
            400: { description: 'Validation error' },
            401: { description: 'Unauthorized' },
            500: { description: 'Error' },
          },
        },
      },
      '/api/promos/{id}': {
        put: {
          tags: ['Promo'],
          summary: 'Update promo',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Promo' } } } },
          responses: {
            200: { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Promo' } } } },
            401: { description: 'Unauthorized' },
            500: { description: 'Error' },
          },
        },
        delete: {
          tags: ['Promo'],
          summary: 'Delete promo',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }],
          responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } },
        },
      },
      '/api/carousel': {
        get: {
          tags: ['Carousel'],
          summary: 'Get carousel slides',
          responses: { 200: { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/CarouselSlide' } } } } }, 500: { description: 'Error' } },
        },
        post: {
          tags: ['Carousel'],
          summary: 'Create slide',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarouselSlide' } } } },
          responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } },
        },
      },
      '/api/carousel/{id}': {
        put: {
          tags: ['Carousel'],
          summary: 'Update slide',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CarouselSlide' } } } },
          responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } },
        },
        delete: {
          tags: ['Carousel'],
          summary: 'Delete slide',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }],
          responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } },
        },
      },
      '/api/rates': {
        get: { tags: ['Rates'], summary: 'Get currency rates', responses: { 200: { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/CurrencyRate' } } } } }, 500: { description: 'Error' } } },
        post: { tags: ['Rates'], summary: 'Create rate', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CurrencyRate' } } } }, responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } } },
      },
      '/api/rates/{id}': {
        put: { tags: ['Rates'], summary: 'Update rate', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CurrencyRate' } } } }, responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } } },
        delete: { tags: ['Rates'], summary: 'Delete rate', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true }], responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' }, 500: { description: 'Error' } } },
      },
      '/api/search': {
        get: {
          tags: ['Search'],
          summary: 'Search across content',
          parameters: [{ in: 'query', name: 'q', schema: { type: 'string' }, required: true }],
          responses: {
            200: {
              description: 'Search results',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      news: { type: 'array', items: { $ref: '#/components/schemas/News' } },
                      promos: { type: 'array', items: { $ref: '#/components/schemas/Promo' } },
                      links: { type: 'array', items: { $ref: '#/components/schemas/QuickLink' } },
                    },
                  },
                },
              },
            },
            500: { description: 'Error' },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
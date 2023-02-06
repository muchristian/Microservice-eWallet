import { getSchemaPath } from '@nestjs/swagger';

export const getPaginatedSchema = (model: string | any): any => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            message: { type: 'string' },
            results: {
              properties: {
                items: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
                totalItems: { type: 'number' },
                itemCount: { type: 'number' },
                itemsPerPage: { type: 'number' },
                totalPages: { type: 'number' },
                currentPage: { type: 'number' },
              },
            },
          },
        },
      ],
    },
  };
};

export const getGenericResponseSchema = (model?: string | any): any => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            message: { type: 'string' },
            results: model
              ? { $ref: getSchemaPath(model) }
              : { type: 'string' },
          },
        },
      ],
    },
  };
};

export const getGenericErrorResponseSchema = (): any => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            statusCode: { type: 'number' },
            message: {
              type: 'array',
              items: { type: 'string' },
            },
            error: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
      ],
    },
  };
};

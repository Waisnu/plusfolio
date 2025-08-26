// OpenAPI 3.0 specification for PlusFolio API
export const apiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'PlusFolio API',
    description: 'AI-powered website analysis and feedback API',
    version: '1.0.0',
    contact: {
      name: 'PlusFolio Support',
      url: 'https://plusfolio.com/support'
    }
  },
  servers: [
    {
      url: 'https://plusfolio.com/api',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    }
  ],
  paths: {
    '/analyze': {
      post: {
        summary: 'Analyze a website',
        description: 'Submit a website URL for comprehensive AI-powered analysis',
        tags: ['Analysis'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://example.com'
                  },
                  analysis_mode: {
                    type: 'string',
                    enum: ['comprehensive', 'recruiter', 'peer', 'client', 'quick'],
                    default: 'comprehensive'
                  },
                  user_id: {
                    type: 'string',
                    format: 'uuid'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Analysis started successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    status: { 
                      type: 'string', 
                      enum: ['processing', 'completed', 'failed'] 
                    },
                    estimated_completion_time: { type: 'number' }
                  }
                }
              }
            }
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/RateLimitError' },
          '500': { $ref: '#/components/responses/ServerError' }
        }
      },
      get: {
        summary: 'Get analysis status',
        description: 'Check the status of an ongoing analysis',
        tags: ['Analysis'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Analysis status retrieved',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Report' }
              }
            }
          },
          '404': { $ref: '#/components/responses/NotFound' }
        }
      }
    },
    '/reports': {
      get: {
        summary: 'Get reports',
        description: 'Retrieve user reports or public reports',
        tags: ['Reports'],
        parameters: [
          {
            name: 'user_id',
            in: 'query',
            schema: { type: 'string', format: 'uuid' }
          },
          {
            name: 'public',
            in: 'query',
            schema: { type: 'boolean' }
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
          },
          {
            name: 'offset',
            in: 'query',
            schema: { type: 'integer', minimum: 0, default: 0 }
          }
        ],
        responses: {
          '200': {
            description: 'Reports retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Report' }
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer' },
                        limit: { type: 'integer' },
                        offset: { type: 'integer' },
                        hasMore: { type: 'boolean' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/reports/{id}': {
      get: {
        summary: 'Get specific report',
        description: 'Retrieve a specific report by ID',
        tags: ['Reports'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Report retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Report' }
              }
            }
          },
          '404': { $ref: '#/components/responses/NotFound' }
        }
      },
      put: {
        summary: 'Update report',
        description: 'Update report settings like public visibility',
        tags: ['Reports'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  is_public: { type: 'boolean' },
                  share_expires_at: { 
                    type: 'string', 
                    format: 'date-time',
                    nullable: true 
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Report updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Report' }
              }
            }
          }
        }
      }
    },
    '/user/dashboard': {
      get: {
        summary: 'Get user dashboard data',
        description: 'Retrieve comprehensive dashboard information for a user',
        tags: ['User'],
        parameters: [
          {
            name: 'user_id',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Dashboard data retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DashboardData' }
              }
            }
          }
        }
      }
    },
    '/github/repositories': {
      get: {
        summary: 'Get GitHub repositories',
        description: 'Retrieve user GitHub repositories from database or GitHub API',
        tags: ['GitHub'],
        parameters: [
          {
            name: 'user_id',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'uuid' }
          },
          {
            name: 'source',
            in: 'query',
            schema: { 
              type: 'string',
              enum: ['database', 'github'],
              default: 'database'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Repositories retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    repositories: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Repository' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Import GitHub repositories',
        description: 'Import selected GitHub repositories to database',
        tags: ['GitHub'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['user_id', 'repositories'],
                properties: {
                  user_id: { type: 'string', format: 'uuid' },
                  repositories: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/GitHubRepository' }
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Repositories imported successfully'
          }
        }
      }
    },
    '/feedback': {
      post: {
        summary: 'Submit feedback',
        description: 'Submit feedback for an analysis report',
        tags: ['Feedback'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FeedbackSubmission' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Feedback submitted successfully'
          },
          '409': {
            description: 'Feedback already submitted'
          }
        }
      }
    },
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Check API health status',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthStatus' }
              }
            }
          },
          '503': {
            description: 'Service is unhealthy'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Report: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          url: { type: 'string', format: 'uri' },
          title: { type: 'string' },
          domain: { type: 'string' },
          analysis_mode: {
            type: 'string',
            enum: ['comprehensive', 'recruiter', 'peer', 'client', 'quick']
          },
          clarity_score: { type: 'integer', minimum: 0, maximum: 100 },
          score_breakdown: {
            type: 'object',
            properties: {
              design: { type: 'number' },
              ux: { type: 'number' },
              technical: { type: 'number' },
              accessibility: { type: 'number' }
            }
          },
          processing_status: {
            type: 'string',
            enum: ['processing', 'completed', 'failed', 'partial']
          },
          report_data: { type: 'object' },
          is_public: { type: 'boolean' },
          shareable_token: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' }
        }
      },
      Repository: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          full_name: { type: 'string' },
          description: { type: 'string', nullable: true },
          language: { type: 'string', nullable: true },
          stargazers_count: { type: 'integer' },
          html_url: { type: 'string', format: 'uri' },
          imported_at: { type: 'string', format: 'date-time' }
        }
      },
      GitHubRepository: {
        type: 'object',
        required: ['id', 'name', 'full_name', 'html_url'],
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          full_name: { type: 'string' },
          description: { type: 'string', nullable: true },
          html_url: { type: 'string', format: 'uri' },
          language: { type: 'string', nullable: true },
          stargazers_count: { type: 'integer' },
          forks_count: { type: 'integer' }
        }
      },
      DashboardData: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          recent_reports: {
            type: 'array',
            items: { $ref: '#/components/schemas/Report' }
          },
          connected_accounts: { type: 'array' },
          repositories: {
            type: 'array',
            items: { $ref: '#/components/schemas/Repository' }
          },
          usage_stats: {
            type: 'object',
            properties: {
              monthly_reports: { type: 'integer' },
              monthly_limit: { type: 'integer' },
              total_reports: { type: 'integer' }
            }
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          full_name: { type: 'string' },
          subscription_tier: {
            type: 'string',
            enum: ['starter', 'plus', 'plus-ultra']
          },
          created_at: { type: 'string', format: 'date-time' }
        }
      },
      FeedbackSubmission: {
        type: 'object',
        required: ['report_id', 'rating'],
        properties: {
          report_id: { type: 'string', format: 'uuid' },
          user_id: { type: 'string', format: 'uuid' },
          rating: { type: 'integer', minimum: 1, maximum: 5 },
          improvement_suggestions: { type: 'string' },
          user_role: {
            type: 'string',
            enum: ['developer', 'designer', 'founder', 'other']
          }
        }
      },
      HealthStatus: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['healthy', 'unhealthy'] },
          timestamp: { type: 'string', format: 'date-time' },
          services: {
            type: 'object',
            properties: {
              database: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  response_time_ms: { type: 'number' }
                }
              }
            }
          }
        }
      }
    },
    responses: {
      ValidationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                details: { type: 'array' }
              }
            }
          }
        }
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string' }
              }
            }
          }
        }
      },
      ServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                message: { type: 'string' }
              }
            }
          }
        }
      },
      RateLimitError: {
        description: 'Rate limit exceeded',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                resetTime: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      }
    }
  }
}
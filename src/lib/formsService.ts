/**
 * Google Forms API Service
 * Handles listing forms, retrieving questions & metadata, reading responses,
 * and creating structured commercial LPG forms (Connections, Orders, Safety Audits).
 */

export interface GoogleFormSummary {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface FormQuestionItem {
  itemId?: string;
  title: string;
  description?: string;
  questionItem?: {
    question: {
      questionId?: string;
      required?: boolean;
      textQuestion?: {
        paragraph?: boolean;
      };
      choiceQuestion?: {
        type: 'RADIO' | 'CHECKBOX' | 'DROP_DOWN';
        options: Array<{ value: string }>;
      };
      scaleQuestion?: {
        low: number;
        high: number;
        lowLabel?: string;
        highLabel?: string;
      };
    };
  };
}

export interface GoogleFormDetails {
  formId: string;
  info: {
    title: string;
    description?: string;
    documentTitle?: string;
  };
  settings?: any;
  items?: FormQuestionItem[];
  revisionId?: string;
  responderUri?: string;
}

export interface FormAnswerItem {
  questionId: string;
  textAnswers?: {
    answers: Array<{ value: string }>;
  };
}

export interface FormResponseItem {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  respondentEmail?: string;
  answers?: Record<string, FormAnswerItem>;
}

/**
 * List Google Forms stored in the user's Google Drive
 */
export async function listGoogleForms(accessToken: string): Promise<GoogleFormSummary[]> {
  const query = encodeURIComponent("mimeType = 'application/vnd.google-apps.form' and trashed = false");
  const fields = encodeURIComponent('files(id,name,modifiedTime,webViewLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=modifiedTime desc&pageSize=50`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to list Google Forms:', errorText);
    throw new Error(`Google Forms Drive search error: ${response.statusText}`);
  }

  const data = await response.json();
  return (data.files || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    modifiedTime: f.modifiedTime,
    webViewLink: f.webViewLink
  }));
}

/**
 * Retrieve form details including items and questions
 */
export async function getGoogleForm(accessToken: string, formId: string): Promise<GoogleFormDetails> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to get Google Form ${formId}:`, errorText);
    throw new Error(`Google Forms API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Retrieve all responses submitted to a Google Form
 */
export async function getGoogleFormResponses(
  accessToken: string,
  formId: string
): Promise<{ responses: FormResponseItem[]; totalCount: number }> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to get responses for form ${formId}:`, errorText);
    throw new Error(`Google Forms Responses API error: ${response.statusText}`);
  }

  const data = await response.json();
  const responses: FormResponseItem[] = data.responses || [];
  return {
    responses,
    totalCount: responses.length
  };
}

export type FormTemplateType = 'new_connection' | 'safety_feedback' | 'bulk_order';

/**
 * Create a new ready-to-use Commercial LPG Google Form with questions
 */
export async function createCommercialLpgGoogleForm(
  accessToken: string,
  templateType: FormTemplateType
): Promise<GoogleFormDetails> {
  let title = '';
  let description = '';
  let requests: any[] = [];

  if (templateType === 'new_connection') {
    title = 'Sandhya Enterprises - New Commercial LPG Connection Request';
    description = 'Official intake form for Restaurants, Hotels, Caterers & Factories in Nelamangala & Bengaluru Rural. Bharat Gas, Go Gas, and Power Gas Commercial Supply.';
    requests = [
      {
        createItem: {
          item: {
            title: 'Business / Establishment Name (ಉದ್ಯಮದ ಹೆಸರು)',
            description: 'E.g. Hotel Mayura, Annapurna Caterers, SK Fabrications',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 0 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Business Category / Type (ಉದ್ಯಮದ ವಿಧ)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Restaurant / Hotel (ಹೋಟೆಲ್)' },
                    { value: 'Bakery / Sweets Manufacturing' },
                    { value: 'Industrial / Canteen / Factory' },
                    { value: 'Catering / Banquet / Function Hall' },
                    { value: 'Cloud Kitchen' },
                    { value: 'Other Commercial Unit' }
                  ]
                }
              }
            }
          },
          location: { index: 1 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Contact Person & Mobile Phone Number (ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ & ಮೊಬೈಲ್)',
            description: 'Active WhatsApp number for instant delivery updates and billing alerts',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 2 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Delivery Address & Landmark (ಡೆಲಿವರಿ ವಿಳಾಸ)',
            description: 'Mention nearest landmark in Nelamangala, Dobbaspet, Peenya, or Bengaluru Rural',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: true }
              }
            }
          },
          location: { index: 3 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Preferred Cylinder Brand & Capacity (ಆದ್ಯತೆಯ ಸಿಲಿಂಡರ್ ಬ್ರ್ಯಾಂಡ್)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'CHECKBOX',
                  options: [
                    { value: 'Bharat Gas 19kg Commercial Blue (Standard)' },
                    { value: 'Bharat Gas 47.5kg Jumbo Industrial' },
                    { value: 'Go Gas Elite 21kg Composite (Non-Blast Lightweight)' },
                    { value: 'Power Gas 19kg Commercial' }
                  ]
                }
              }
            }
          },
          location: { index: 4 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Estimated Monthly Consumption (ಅಂದಾಜು ಮಾಸಿಕ ಸಿಲಿಂಡರ್ ಬಳಕೆ)',
            questionItem: {
              question: {
                required: false,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: '1 to 5 Cylinders / Month' },
                    { value: '6 to 15 Cylinders / Month' },
                    { value: '16 to 40 Cylinders / Month' },
                    { value: '40+ Bulk Commercial Supply / Month' }
                  ]
                }
              }
            }
          },
          location: { index: 5 }
        }
      },
      {
        createItem: {
          item: {
            title: 'GSTIN (Optional / ಜಿಎಸ್‌ಟಿ ಸಂಖ್ಯೆ - ಇನ್‌ವಾಯ್ಸ್‌ಗಾಗಿ)',
            questionItem: {
              question: {
                required: false,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 6 }
        }
      }
    ];
  } else if (templateType === 'safety_feedback') {
    title = 'Sandhya Enterprises - Delivery & Safety Satisfaction Survey';
    description = 'Official feedback for Bharat Gas, Go Gas & Power Gas cylinder delivery, O-ring seal checks, and delivery boy conduct.';
    requests = [
      {
        createItem: {
          item: {
            title: 'Customer Name / Business Name (ಗ್ರಾಹಕರ / ಹೋಟೆಲ್ ಹೆಸರು)',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 0 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Order / Delivery Invoice Number (ಇನ್‌ವಾಯ್ಸ್ ಸಂಖ್ಯೆ)',
            questionItem: {
              question: {
                required: false,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 1 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Was Delivery on Time? (ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ತಲುಪಿಸಲಾಗಿದೆಯೇ?)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Yes, prompt within 2 hours' },
                    { value: 'Yes, same day delivery' },
                    { value: 'Slightly delayed' },
                    { value: 'Emergency rush order handled quickly' }
                  ]
                }
              }
            }
          },
          location: { index: 2 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Did the delivery partner perform Safety O-Ring leak check? (ಸುರಕ್ಷತಾ ಓ-ರಿಂಗ್ ತಪಾಸಣೆ ಮಾಡಲಾಗಿದೆಯೇ?)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Yes, tested safety seal & O-ring in front of me' },
                    { value: 'No, seal checked by me' },
                    { value: 'Not required' }
                  ]
                }
              }
            }
          },
          location: { index: 3 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Overall Satisfaction Rating (ಸಮಗ್ರ ಸೇವಾ ತೃಪ್ತಿ 1 - 5)',
            questionItem: {
              question: {
                required: true,
                scaleQuestion: {
                  low: 1,
                  high: 5,
                  lowLabel: 'Poor (ಅತೃಪ್ತ)',
                  highLabel: 'Excellent (ಅತ್ಯುತ್ತಮ)'
                }
              }
            }
          },
          location: { index: 4 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Any additional comments or suggestions? (ಸಲಹೆಗಳು)',
            questionItem: {
              question: {
                required: false,
                textQuestion: { paragraph: true }
              }
            }
          },
          location: { index: 5 }
        }
      }
    ];
  } else {
    // bulk_order
    title = 'Sandhya Enterprises - Bulk Commercial LPG Refill Booking';
    description = 'Express cylinder re-ordering for ongoing commercial customers in Nelamangala, Dobbaspet, and Bengaluru Rural.';
    requests = [
      {
        createItem: {
          item: {
            title: 'Registered Business Name / Account Name',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 0 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Number of Filled Cylinders Needed (ತುಂಬಿದ ಸಿಲಿಂಡರ್‌ಗಳ ಸಂಖ್ಯೆ)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: '1 to 2 Cylinders' },
                    { value: '3 to 5 Cylinders' },
                    { value: '6 to 10 Cylinders' },
                    { value: '11 to 25 Cylinders (Bulk Manifold Refill)' },
                    { value: '25+ Cylinders' }
                  ]
                }
              }
            }
          },
          location: { index: 1 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Empty / MT Cylinders Ready for Pickup (ಖಾಲಿ ಸಿಲಿಂಡರ್‌ಗಳು ಸಿದ್ಧವಿವೆಯೇ?)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Yes, equal number of empty cylinders ready' },
                    { value: 'Fewer empty cylinders (Partial return)' },
                    { value: 'Security deposit cylinder expansion' }
                  ]
                }
              }
            }
          },
          location: { index: 2 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Delivery Urgent Requirement (ಡೆಲಿವರಿ ಆದ್ಯತೆ)',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Emergency: ASAP (Under 2 Hours)' },
                    { value: 'Today Evening before peak dinner rush' },
                    { value: 'Tomorrow Morning (6 AM - 9 AM)' },
                    { value: 'Standard schedule delivery' }
                  ]
                }
              }
            }
          },
          location: { index: 3 }
        }
      }
    ];
  }

  // 1. Create base form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title,
        documentTitle: title
      }
    })
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    console.error('Failed to create Google Form:', errorText);
    throw new Error(`Google Forms Create error: ${createRes.statusText}`);
  }

  const newForm = await createRes.json();
  const formId = newForm.formId;

  // 2. Add description and questions via batchUpdate
  const batchRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      includeFormInResponse: true,
      requests: [
        {
          updateFormInfo: {
            info: {
              description
            },
            updateMask: 'description'
          }
        },
        ...requests
      ]
    })
  });

  if (!batchRes.ok) {
    const errorText = await batchRes.text();
    console.warn('BatchUpdate on new form completed with partial response:', errorText);
    return newForm;
  }

  const batchData = await batchRes.json();
  return batchData.form || newForm;
}

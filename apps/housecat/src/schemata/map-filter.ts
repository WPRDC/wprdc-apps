type Schema = Record<
  string,
  {
    label: string;
    items: { id: string; label: string }[];
  }
>;

export const schema: Schema = {
  'risk-level': {
    label: 'HUD Multifamily Subsidy Expiration',
    items: [
      { id: '', label: '---' },
      { id: 'future', label: 'Subsidy expiration 5+ years away' },
      { id: '5yr', label: 'Subsidy expiration within 5 years' },
      { id: '3yr', label: 'Subsidy expiration within 3 years' },
      { id: '1yr', label: 'Subsidy expiration within 1 year' },
      { id: '6mo', label: 'Subsidy expiration within 6 months' },
    ],
  },
  'lihtc-compliance': {
    label: 'LIHTC Compliance Period',
    items: [
      { id: '', label: '---' },
      { id: 'initial', label: 'Within initial compliance period (0-15yrs)' },
      { id: 'extended', label: 'Within extended use period (15-30yrs)' },
      {
        id: 'initial-exp',
        label: 'Initial compliance period expiring soon (13-15yrs)',
      },
      {
        id: 'extended-exp',
        label: 'Extended use period expiring soon (27-30yrs)',
      },
    ],
  },
  'reac-score': {
    label: 'HUD Multifamily and Public Housing inspection Scores',
    items: [
      { id: '', label: '---' },
      { id: 'failing', label: 'Failing (<60)' },
      { id: 'annual-inspection', label: 'Annual Inspection Required (<80)' },
      {
        id: 'minimal-inspection',
        label: 'Inspection Required Every 2-3 Years (>=80)',
      },
    ],
  },
  'last-inspection': {
    label: 'Recent Inspections',
    items: [
      { id: '', label: '---' },
      { id: '3mos', label: 'Inspected in past 3 months' },
      { id: '6mos', label: 'Inspected in past 6 months' },
    ],
  },
  'funding-category': {
    label: 'Funding Category',
    items: [
      { id: '', label: '---' },
      { id: 'hud-mf', label: 'HUD Mutlifamily' },
      { id: 'lihtc', label: 'LIHTC' },
      { id: 'public-housing', label: 'Public Housing' },
      { id: 'multiple', label: 'Multiple Sources' },
    ],
  },
  status: {
    label: 'Status',
    items: [
      { id: '', label: '---' },
      { id: 'closed', label: 'Closed' },
      { id: 'unknown', label: 'Unknown' },
    ],
  },
};

export const initValues: Record<string, string | null> = {
  'risk-level': null,
  'lihtc-compliance': null,
  'reac-score': null,
  'last-inspection': null,
  'funding-category': null,
  status: null,
};

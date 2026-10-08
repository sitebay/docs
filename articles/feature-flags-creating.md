---
title: "Feature Flags"
date: 2025-12-04
tags: ["feature-flags", "testing", "deployment"]
---

# Feature Flags

Toggle features on/off without code deploys. Test safely, rollback instantly.

## How It Works

1. Build feature with flag wrapper
2. Deploy with flag OFF
3. Enable for yourself → test
4. Roll out to 5% → 25% → 50% → 100%
5. If issues: instant OFF

## Use Cases

| Type | Example | Rollout Strategy |
|------|---------|------------------|
| New feature | Redesigned checkout | Gradual: 5% → 100% |
| A/B test | Two homepage versions | 50/50 split |
| Seasonal | Holiday banner | Time-based auto on/off |
| Kill switch | Payment method | Always ready, normally on |

## Setup

1. **Dashboard > Feature Flags > Create**
2. Name it clearly: `new-checkout-v2`
3. Set to 0% (off)
4. Add yourself to "always on" list
5. Test, then begin rollout

## Rollout Schedule

- **Week 1**: Internal team only
- **Week 2**: 5% of visitors
- **Week 3**: 25% if metrics stable
- **Week 4**: 50%
- **Week 5**: 100% if successful

## Targeting Options

- **Percentage**: Random % of users
- **Geography**: By country/region
- **Device**: Mobile/desktop
- **User list**: Specific accounts
- **Time**: Auto on/off at set times

## Mistakes to Avoid

1. Rolling out 100% immediately
2. No success metrics defined
3. Not monitoring during rollout
4. Leaving old flags cluttering dashboard

## Monitoring

Track during rollout:
- Conversion rate
- Error rate  
- Page load time
- User complaints
# Flow Notes — QA Report

Fill this in as you test. Add a row for every flow/feature you check — including
the ones that work fine (that's useful information too). This is your bug report
to the senior dev.

**Tested by:** Ishika Verma
**Date:** 21/06/2026

---

## Summary

- Bugs found: 9
- Things that looked suspicious but were actually fine: 8

## Findings

| # | Flow / feature tested | Steps to reproduce   |     Expected     |    Actual    | Bug? (Y/N) | Severity (Low/Med/High) |
|---|-----------------------|----------------------|------------------|--------------|------------|-------------------------|
| 1 | Search                | Search "Aisha", then | Search should be | Results only |     Y      |          Medium         |
|   |                       | "aisha" or "AISHA"   | case-insensitive | appear with  |            |                         |
|   |                       |                      |                  | exact casing |            |                         |
| 2 | Pagination            | Navigate through all | Each page should | Last item    |     Y      |          Medium         |
|   |                       | pages                | show unique      | repeated     |            |                         |
|   |                       |                      | experts          |              |            |                         |
| 3 | Shortlist Counter     | Add/remove           | Counter updates  | Counter      |     Y      |          Medium         |
|   |                       | shortlisted expert   |                  | unchanged    |            |                         |
| 4 | Shortlist persistence | Add experts to       | Shortlisted      | Shortlist is |     Y      |           High          |
|   |                       | shortlist and        | experts should   | cleared after|            |                         |
|   |                       | refresh page         | persist          | refresh      |            |                         |
| 5 | Name validation       | Enter only spaces    | Validation error | Blank expert |     Y      |           High          |
|   |                       | in the Name field    | should be shown  | created      |            |                         |
|   |                       | and submit           |                  |              |            |                         |
| 6 | Experience validation | Enter a negative     | Validation error | Expert with  |     Y      |           High          |
|   |                       | experience value     | should be shown  | negative     |            |                         |
|   |                       | and submit           |                  | experience   |            |                         |
|   |                       |                      |                  | is created   |            |                         |
| 7 | Shortlist page        | View shortlisted     | All shortlist    | Works        |     N      |            -            |
|   | functionality         | experts, remove      | actions should   | correctly    |            |                         |
|   |                       | experts and test     | work correctly   |              |            |                         |
|   |                       | empty state          |                  |              |            |                         |
| 8 | Search + Filter       | Apply Neurology      | Search should    | Works        |     N      |            -            |
|   |                       | filter and search    | respect selected | correctly    |            |                         |
|   |                       | for experts          | filter           |              |            |                         |
| 9 | Search + Pagination   | Search broad and     | Pagination       | Works        |     N      |            -            |
|   |                       | specific terms       | should update    | correctly    |            |                         |
|   |                       |                      | correctly        |              |            |                         |
|10 | Filter + Pagination   | Navigate to later    | Filtered results | Works        |     N      |            -            |
|   |                       | page and apply       | should display   | correctly    |            |                         |
|   |                       | filter               | correctly        |              |            |                         |
|11 | Invalid URL           | Open invalid expert  | Show "Expert     | Works        |     N      |            -            |
|   | handling              | URL manually         | not found" page  | correctly    |            |                         |
|12 | Specialty validation  | Attempt to submit    | Specialty should | Works        |     N      |            -            |
|   |                       | without specialty    | be required      | correctly    |            |                         |
|13 | Expert persistence    | Create expert and    | Expert should    | Works        |     N      |            -            |
|   |                       | refresh page         | persist after    | correctly    |            |                         |
|   |                       |                      | refresh          |              |            |                         |
|14 | Long name submission  | Submit expert with   | Expert should be | Works        |     N      |            -            |
|   |                       | a very long name     | created without  | correctly    |            |                         |
|   |                       |                      | validation issues|              |            |                         |
|15 | Long name display     | Create expert with   | Long names should| Long name    |     Y      |          Medium         |
|   | on mobile             | a very long name     | wrap or be       | overflows and|            |                         |
|   |                       | and view on mobile   | displayed safely | breaks layout|            |                         |
|16 | Form validation       | Type in Name field   | Validation errors| Errors for   |     Y      |           Low           |
|   | behaviour             | without submitting   | should appear    | Email and    |            |                         |
|   |                       | the form             | only when needed | Specialty    |            |                         |
|   |                       |                      |                  | appear early |            |                         |
|17 | Email validation      | Enter an invalid     | Validation error | Invalid email|     Y      |           High          |
|   |                       | email and submit     | should be shown  | accepted     |            |                         |

## Notes / assumptions

<anything you assumed, couldn't reproduce, or want to flag>

- The issue where a newly added expert did not appear in 
  Name sorting was caused by the pagination bug, so it
  was not counted as a separate bug.
  
- Filter and sort options reset when returning from an 
  expert's detail page. This was observed but not 
  counted as a bug because the expected behaviour was 
  not specified.

# Flow Notes — QA Report

Fill this in as you test. Add a row for every flow/feature you check — including
the ones that work fine (that's useful information too). This is your bug report
to the senior dev.

**Tested by:** Mahesh Kumar
**Date:** 20 June 2026

---

## Summary

- Bugs found: 14
- Things that looked suspicious but were actually fine: 2
  - Hydration warning caused by a browser extension, not the application itself.
  - Specialty filtering functionality worked correctly during testing.

## Findings

| #   | Flow / feature tested                          | Steps to reproduce                                                                            | Expected                                                                                           | Actual                                                                                                        | Bug? (Y/N) | Severity (Low/Med/High) |
| --- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------- |
| 1   | Pagination                                     | Navigate from Page 1 to Page 2                                                                | Each page should display a unique set of experts                                                   | Last expert from previous page is repeated as first expert on next page                                       | Y          | Medium                  |
| 2   | Search by name                                 | Search using lowercase or mixed-case text (e.g., "aisha", "AISHA")                            | Search should be case-insensitive and match names regardless of letter case                        | Results are only returned when the exact case matches                                                         | Y          | Medium                  |
| 3   | Filter by specialty                            | Select different specialties from the filter dropdown                                         | Only experts belonging to the selected specialty should be displayed                               | Filtering worked correctly for all tested specialties                                                         | N          | -                       |
| 4   | Expert rating calculation                      | Compare displayed rating with underlying review values(review_array in seed)                  | Average rating should be calculated as total reviews sum divided by number of reviews              | Rating is inflated because calculation divides by (reviews.length - 1)                                        | Y          | High                    |
| 5   | Shortlist persistence                          | Shortlist an expert and refresh the page                                                      | Shortlisted state should persist across refreshes                                                  | Shortlisted state is lost after page refresh                                                                  | Y          | High                    |
| 6   | Expert detail page - Back navigation           | Navigate to Page 3, open an expert profile, and click "Back to directory"                     | User should return to the previously viewed directory page and preserve navigation context         | User is always returned to Page 1 because pagination state is reset when the directory page remounts          | Y          | Medium                  |
| 7   | Shortlist count update                         | Click the star icon to shortlist an expert and observe the count in the header                | The shortlist count should update immediately after adding or removing an expert                   | The shortlist count does not update immediately and only reflects the correct value after refreshing the page | Y          | Medium                  |
| 8   | Sort by rating                                 | Select "Sort: Rating" from the dropdown                                                       | Experts should be sorted from highest rated to lowest rated so that top-rated experts appear first | Experts are sorted in ascending order (lowest rated to highest rated)                                         | Y          | Medium                  |
| 9   | Add expert - Email format validation           | Enter an invalid email such as abc, abc@, or test.com and submit the form                     | Form should reject invalid email formats                                                           | Form accepts invalid email formats and creates the expert                                                     | Y          | Medium                  |
| 10  | Add expert - Email whitespace handling         | Enter an email with leading/trailing spaces such as " doctor@example.com" and submit the form | Extra whitespace should be trimmed before validation and storage                                   | Email is stored with unnecessary whitespace                                                                   | Y          | Low                     |
| 11  | Add expert - Name whitespace validation        | Enter only whitespace characters in the name field and submit the form                        | Form should reject empty or whitespace-only names                                                  | Form accepts whitespace-only names and creates the expert                                                     | Y          | Medium                  |
| 12  | Add expert - Name character validation         | Enter names containing numbers or invalid symbols such as Dr123 or @@@ and submit the form    | Form should only allow valid alphabetic names and common punctuation                               | Form accepts names containing numbers and invalid symbols                                                     | Y          | Medium                  |
| 13  | Add expert - Years of experience validation    | Enter a negative value such as -3 and submit the form                                         | Negative experience values should not be allowed                                                   | Form accepts negative experience values                                                                       | Y          | High                    |
| 14  | Add expert - Unrealistic experience validation | Enter an unrealistically high value such as 100 years and submit the form                     | Form should reject unrealistic experience values                                                   | Form accepts unrealistic experience values                                                                    | Y          | Medium                  |
| 15  | Add expert - Duplicate email validation        | Add an expert using an email address that already exists and submit the form                  | Form should prevent creation of duplicate experts with the same email address                      | Form allows multiple experts to be created with the same email address                                        | Y          | Medium                  |

## Notes / assumptions

1. Observed a hydration warning in development mode.
   - The warning appears to be caused by a browser extension injecting the attribute `cz-shortcut-listen="true"` into the DOM.
   - Could not reproduce after disabling extensions / using incognito mode.

2. Assumed that sorting by rating should prioritize higher-rated experts first, as this is the common behavior in directory and listing interfaces.

3. In addition to sorting by name and rating, experts could also be sorted by years of experience to help users identify more experienced specialists easily.

4. Assumed that returning from an expert detail page should preserve the user's previous pagination state, as this is common behavior in directory/listing interfaces.

5. It was assumed that email addresses could be normalized to lowercase as a convention to avoid case-mismatch issues, although this behavior was not explicitly required by the assignment.

6. Maximum length constraints for name and email fields were added as defensive validation assumptions and were not explicitly required by the assignment.

7. The "Back to directory" navigation does not preserve the user's previous pagination state. The issue was identified but left unchanged because a proper fix would require URL-based state persistence, which was considered outside the scope of minimal changes.

## PR Description

1. Pagination overlap issue

   Location: lib/db.ts

   Issue:
   The pagination start index was calculated using (PAGE_SIZE - 1), causing the last expert from one page to appear again on the next page.

   Fix:
   Updated the pagination logic to calculate the start index using PAGE_SIZE directly.

2. Case-sensitive search

   Location: lib/db.ts

   Issue:
   Search functionality was case-sensitive and only returned results when the query matched the exact letter casing of the expert's name.

   Fix:
   Normalized both the search query and expert names using toLowerCase() before performing the comparison, making the search case-insensitive.

3. Incorrect average rating calculation

   Location: lib/rating.ts

   Issue:
   Average ratings were calculated by dividing the total review score by (reviews.length - 1), resulting in inflated and incorrect ratings.

   Fix:
   Updated the calculation to divide the total review score by reviews.length, ensuring accurate average ratings.

4. Shortlist persistence issue

   Location : lib/store.ts

   Issue:
   Shortlist experts are only stored in memory state of zustand so whenever the page referesh all shortlist experts were lost

   Fix:
   Added Zustand's persist middleware to save the shortlist state in localStorage, ensuring that shortlisted experts remain available across page refreshes and browser restarts.

5. Shortlist count update issue

   Location: components/Header.tsx

   Issue:
   The shortlist count in the header was initialized using useShortlist.getState() and did not subscribe to store updates. As a result, the count only updated after a page refresh.

   Fix:
   Replaced the one-time state initialization with a Zustand selector (useShortlist((state) => state.ids.length)) so that the header automatically re-renders whenever the shortlist changes.

6. Invalid email format accepted

   Location: lib/schemas.ts

   Issue:
   The add expert form only checked whether the email field was non-empty and accepted invalid email formats.

   Fix:
   Added Zod's .email() validation to ensure that only valid email addresses are accepted.

7. Whitespace-only names accepted

   Location: lib/schemas.ts

   Issue:
   The add expert form accepted names containing only whitespace characters.

   Fix:
   Added .trim() before validation to reject whitespace-only names.

8. Invalid characters allowed in names

   Location: lib/schemas.ts

   Issue:
   The add expert form allowed numbers and unsupported special characters in the name field.

   Fix:
   Added regex validation to allow only alphabetic characters and commonly used punctuation in names.

9. Invalid years of experience values accepted

   Location: lib/schemas.ts

   Issue:
   The add expert form accepted negative and unrealistic years of experience values.

   Fix:
   Added minimum and maximum constraints to ensure that years of experience remain within a realistic range.

10. Rating sort order issue

    Location: lib/db.ts

    Issue:
    Experts were sorted in ascending order (lowest rating first) when the "Sort by Rating" option was selected, causing lower-rated experts to appear before higher-rated experts.

    Fix:
    Updated the sorting logic to order experts by average rating in descending((a,b)=>b-a) order so that higher-rated experts appear first.

    Note:
    This fix assumes that users expect the highest-rated experts to appear first, which is the common behavior in directory and listing interfaces.

11. Duplicate expert creation

    Location: lib/db.ts

    Issue:
    The application allowed multiple experts to be created with the same email address, resulting in duplicate expert records.

    Fix:
    Added a uniqueness check before creating a new expert to prevent duplicate experts with the same email address.

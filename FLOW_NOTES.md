# Flow Notes — QA Report

Fill this in as you test. Add a row for every flow/feature you check — including
the ones that work fine (that's useful information too). This is your bug report
to the senior dev.

**Tested by:** <Shruti Singh>
**Date:** <21-06-2026>

---

## Summary

- Bugs found: <10>
- Things that looked suspicious but were actually fine: <2>

## Findings

| # | Flow / feature tested | Steps to reproduce | Expected | Actual | Bug? (Y/N) | Severity (Low/Med/High) |
|---|-----------------------|--------------------|----------|--------|------------|-------------------------|


| 1 |Search Bar | Typed "ben","BEN"| Dr.Ben Carter should appear| No expert match| Y | Med  |

| 2 |Shortlist Count | Click star icon 4 experts | Shortlist(4)|Counter remains (0)| Y |Med |

| 3 | Sort expert by rating | Select Sort:Rating | Experts should display in rating order  |    Experts were displayed in ascending rating order   | N  | N/A |

| 4 | Average Rating Calculation  | Viewed the ratings of expert then compare the rating with reviews data in seed.ts (eg.[5,4,5,4]) | Average should be calculated as (sum of reviews)/(Total number of reviews) | On display the ratings are higher than expected (eg. 6,7,9)  | Y  | High |

| 5 |  Page navigation  | Opening the experts list and then navigating through page-1,2,3 | Each expert should appear only once. No duplicate entries should be there . | The last expert on Page 1 (Dr. Diana Lopez) appears again on Page 2, and the last expert on Page 2 (Dr. Grace Park) appears again on Page 3. |  Y |  Med |


| 6 |  Specialty Filter  | Selected "Cardiology" from the specialty dropdown. | Only experts with specialty "Cardiology" should be displayed. | Both "Cardiology" and "Pediatric Cardiology" were displayed | Y | Med |

| 7 |  Add Expert - Email Validation   | Enter "abc" in Email field and click save option | System should reject invalid email formats and display an error message.  | Expert is saved successfully with email abc | Y   | Med |

| 8 | Add Expert - Years of experience   | Enter -5 in experience field and click save option  | System should reject negative experience and display an error message  | Expert is saved successfully with -5 yrs experience  | Y | Med |

| 9 | Add Expert- Years of experience  | Enter 500 in experience field and click save option |System should reject unrealistic experience values and display an error message | Expert is saved successfully with 500 yrs experience | Y | Med |

| 10 |Add Expert - Duplicate Email | Enter the same email address that already exist and save expert | System should reject the same email address and display the error message | Expert is saved with the same email address that was used before| Y | Med |

| 11 | Seniority Label | Added experts with 5,3,6 years of experience | Labels should relate to Associate (0-7), Senior (8-14)|Principal (15+)|Labels displayed correctly | N | N/A |   

| 12 | Add-Expert- Name | Enter 7890 in the Name field and save expert | System should reject names containing only numeric value | Expert is saved with the name 7890 | Y | Med |



## Notes / assumptions

<anything you assumed, couldn't reproduce, or want to flag>

## Page Navigation 
Duplicate names were showing. In db.ts , Initial - const start = (page-1)* (PAGE_SIZE-1) 
Final - const start = (page-1)*(PAGE_SIZE).

## Average Rating
In seed.ts the reviews are given as [5,4,5,4] so average should be less than 5. But earlier it was coming 6,7,9 . In rating.ts change in formula made sum / Math.max(reviews.length -1 , 1) to changes to sum / Math.max(reviews.length , 1)

## Search Bar 
when initially the name was searched as "ben" , "BEN" the result do not show Dr. Ben Carter then in db.ts toLowerCase() is added. 

## Email Validation 
In schemas.ts email: z.string().email('Invalid email address').min(1, 'Email is required'), is added so valid email input should be taken. 

## Year Of experience Validation 
In schema.ts min and max limit is added

## Name Validation 
In schemas.ts regex is added 

## Specialty Filter  
In db.ts e.specialty.toLowerCase() === specialty.toLowerCase() is added
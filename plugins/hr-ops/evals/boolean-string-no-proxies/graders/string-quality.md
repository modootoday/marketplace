---
type: llm
---

Context the reply answers: the user wants a LinkedIn Boolean search string for a senior data engineer. Stated requirements: Python or Scala, Spark, Airflow, AWS with Redshift or S3; title data engineer or a close variant; exclude interns, students and anyone with "recruiter" in their profile. The user wants one tight version and one wider version.

PASS only if the reply does all of these:
1. Gives two separate strings labelled as narrow and broad, with the broad one using fewer required groups or more title and skill variants than the narrow one.
2. Uses valid Boolean syntax on every string shown: uppercase AND, OR and NOT, multi-word phrases in quotes, and parentheses that balance (every opening parenthesis has a closing one).
3. Groups synonyms and variants with OR (for example title variants of data engineer, and Python or Scala together, Redshift or S3 together) and joins the skill groups with AND.
4. Applies the stated exclusions with NOT for intern, student and recruiter terms, and adds no exclusion the user did not state.
5. Notes that platform limits (string length, nesting, operator behaviour) are not confirmed and the string should be tested in the platform, without stating exact limits as fact.

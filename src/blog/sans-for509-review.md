---
slug: "sans-for509-review"
title: "SANS FOR509 Review"
description: "A review of the SANS FOR509 cloud forensics course, covering its strengths in cloud log analysis and practical lab exercises"
date: 2022-12-24
author: "Ryan Thompson"
tags: ["sans", "forensics", "cloud", "certification"]
featured: true
editable: false
---

This review examines the SANS FOR509 cloud forensics course, highlighting its strengths in teaching cloud log analysis across major providers while noting limitations in certain technical areas.

## Key Strengths

### Well-Structured Content

The course dedicates one day per cloud platform, creating a manageable learning progression. The instruction avoids unnecessary material and maintains focus on practical forensic skills throughout the five-day program.

### Practical Lab Exercises

Students work with raw log data ingested into SOF-ELK, learning real investigation techniques. The labs emphasize investigation pivoting—finding suspicious activity and tracing related events—a challenging skill that the course teaches effectively.

### Log Retention & Acquisition Knowledge

The curriculum clearly explains default logging behaviors, retention periods, and cost implications, while demonstrating both cloud-native and external analysis methods.

## Notable Limitations

The course doesn't match the artifact-discovery depth of traditional forensics classes. As I noted during my experience, "cloud does not offer the same depth of artifacts due to its abstracted nature." Coverage areas with less emphasis include JSON parsing with jq, cloud attack methodologies, and Kubernetes forensics (limited to final course sections without hands-on labs).

## Challenge Component

The Day 6 challenge provides realistic application of learned skills through team-based raw data analysis, culminating in findings presentations judged by classroom vote.

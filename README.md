# Be Human - Capstone Project
<p align="center">
<img alt="Be Human" src="https://github.com/Ben-21/capstone-neuefische/assets/118177877/8bc02cf3-20f8-4028-8f2d-34d6cdee4d64"></img>
</p>
  
> "Be Human" is my capstone project, developed during the neuefische Java Full Stack Bootcamp, showcasing skills in Java Fullstack Backend Development and Fullstack Development by implementing crud operations.  


## SonarCloud
### backend
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-backend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-backend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-backend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-backend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-backend)

### frontend
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ben-21_capstone-neuefische-frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=ben-21_capstone-neuefische-frontend)


## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

## Overview

Title: Be Human - Humanitarian Project Platform

Summary:
"Be Human" is an innovative application developed using a comprehensive tech stack that includes Java, Spring Boot, REST, Maven, JUnit, React, TypeScript, MongoDB, and Docker. The platform serves as a hub for fostering participation in humanitarian initiatives.

Key Features - CRUD-Operations:
The app allows users to engage in existing humanitarian projects and create new ones. Projects are categorized into two main types: Donation Projects and Aid Projects. Users can contribute financially to both types and actively participate as volunteers in Aid Projects. Each project can define specific goals, such as donation targets or the number of volunteers needed.

Motivation through Progress:
The application calculates and visually presents project progress, both numerically and as a percentage, based on registered donations or volunteers and the predefined goal. This progress tracking serves as motivation for users to actively contribute.

Project Filtering and Search:
Users can easily navigate through projects using the filter function, which categorizes projects. Additionally, a comprehensive search function enables users to explore projects based on various attributes.

User Management and Security:
The backend incorporates Spring Security for robust user management. While projects are publicly viewable, contributing or participating requires user registration and login. Registered users can create and modify projects, with each user having only access to their own projects exclusively regarding changing content of a project.

Insightful Analytics:
The platform offers insightful analytics for both projects and users. For projects, users can view total donation amounts and the number of volunteers involved. The platform also features a unique privacy-focused approach for recognizing top donors, displaying avatars composed of initials instead of full usernames.

Personalized User Insights:
Users gain access to personalized insights, including lists of their own projects and projects they've participated in, segmented into Donation Projects and Aid Projects. Users can view cumulative donation amounts and their total contributions to projects, promoting a sense of accomplishment.

In Conclusion:
"Be Human" is a compelling application that leverages an array of cutting-edge technologies to facilitate engagement in humanitarian projects. The platform's user-friendly interface, robust security features, motivational progress tracking, and insightful analytics converge to encourage active participation in noble causes. Everyone shall be reminded of the importance of performing acts of kindness.

## Tech Stack

- Java
- Spring Boot
- Maven
- JUnit
- TypeScript
- React
- MongoDB
- REST
- OpenAl
- Docker

## Features

- CRUD Operations (create, read, update, delete)
- Objects stored in MongoDB
  - Project
  - User
  - Donation
  - Volunteer
 
- Progress Calculation
- Top Tier Calculation 

## Usage

1. ATTENTION: App is only build for mobile use! Please turn on mobile view in your webbrowser.
2. Clone the repository: `git clone https://github.com/your-username/Be-Human.git`
3. Start backend and frontend inside your IDE (e.g. IntelliJ)
4. Define accesss to MongoDB via environment variable "MONGO_DB_URI" (e.g. mongodb://localhost:27017/capstoneDB)

## License

Copyright [2023] [Ben-21]

---


# Introduction
Company Eat street has requested testing for their delivery service website. The primary goal is to verify the correct operation of the ordering and delivery system.

# Background
The current order placement process is as follows: a user selects the delivery method and location, adds items to the cart, clicks proceed to checkout, fills in the order details, and clicks continue.

# Objectives
- Ensure that the user can smoothly complete the journey from product selection to successful payment
- Identify defects in crucial user path
- Ensure proper interaction between the client-side and the server
- Reduce the risk of errors during real-world usage

# Role
- QA Engineer – test case creation, execution, bug reporting 
- QA Lead – test planning, approval, release decision 

# Risks
**Incorrect cart calculation**  
Mitigation:  
- Implement automated API tests for backend calculations  

**Inconsistent UI across devices and browsers**  
Mitigation:  
- Perform cross-browser testing  
- Test on multiple devices  

**Broken navigation**  
Mitigation:  
- Implement automated tests for links and routing  
- Validate error pages  

# Entry Criteria
- Test data is prepared
- Core pages are available
- Test environment is set up
- Test cases are created and reviewed

# Exit Criteria
- All planned test cases are executed
- All critical and high severity defects are fixed and retested
- Test coverage for critical functionality is complete

# Testing Approach

## Testing Levels
- System testing – testing the entire system

## Testing Types
- Functional testing – verifying that functionality meets requirements (adding items, checkout, payment, login form)

### Non-functional testing
1. Load testing
2. Risk-Based Testing – a testing approach where testing activities are planned and prioritized based on the level of risk
3. Black-box testing – testing approach where the system is tested based on inputs and expected outputs without knowledge of internal code structure
4. Regression Testing – verifying that recent changes have not negatively affected existing functionality
5. Smoke testing – basic checks to ensure that the core functionality of the application works before detailed testing
6. End-to-End testing – validating the full flow from product selection to order confirmation

# Environment
- Integration and system testing are performed in the testing environment
- Production Environment – the live environment  

## Browsers
- Google Chrome

## Device
- Desktop

## Network
- Stable internet connection

# Testing Tools
- Jira – issue tracking system
- Postman – API testing tool
- Playwright – automation framework
- TypeScript – programming language
- GitHub – version control system
- GitHub Actions – CI/CD automation tool
- TestRail – test management tool
- Confluence – documentation

# Configuration Management of Testware
- Test checklist
- Test case
- Bug report
- Test result

# Test Deliverables
- Test Plan
- Test Cases
- Test Checklist
- Bug Reports
- Test Execution Reports

# Test Documentation
- Confluence

# Test Data
- Test user accounts
- Various delivery addresses

# Defect Management
- All defects are logged in Jira
- Each defect is assigned a priority and severity

# Metrics
- Test Coverage
- Defect Leakage
- Defect Density
- Execution time
- Defect Resolution Time

# Verification and Approval
- Testing is considered complete after all planned test cases are executed
- All critical and blocking defects must be fixed
- Test results are documented
- Final release decision (Go/No-Go) is made by the QA Lead

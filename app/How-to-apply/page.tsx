/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const applicationOptions = [
  "TRT (Taxpayer Registration Token)",
  "TIN (Taxpayer Identification Number)",
  "PAN (Permanent Account Number)",
  "VAT Registration",
  "GSTIN (Goods and Services Tax Identification Number)",
  "EIN (Employer Identification Number)",
  "TAN (Tax Deduction and Collection Account Number)",
  "SSN (Social Security Number)",
  "UTR (Unique Taxpayer Reference)",
  "Tax Residency Certificate",
  "Business Tax Clearance Certificate",
  "Withholding Tax Certificate",
  "Income Tax Clearance Certificate",
  "Property Tax Registration",
  "Professional Tax Registration",
  "Customs Duty Identification",
  "Excise Tax Permit",
  "Non-Filer Certificate",
  "Tax Exemption Certificate",
  "Capital Gains Tax Registration",
  "Payroll Tax Registration",
  "Exporter/Importer Tax Identification",
  "Digital Taxpayer Certificate",
];

const applicationSteps = {
  "TRT (Taxpayer Registration Token)": [
    "1. **Visit the official tax registration portal**: To start the process of applying for the Taxpayer Registration Token (TRT), visit the official [Income Tax e-Filing Portal](https://www.incometax.gov.in) which is the government’s platform for registration and filing of taxes.",

    "2. **Sign up for a new account or log in**: If you are a first-time user, click on the 'Register Yourself' button on the portal's homepage. For existing users, log in using your credentials. For registration, follow the detailed instructions provided here: [How to Register on Income Tax Portal](https://www.incometax.gov.in/iec/foportal).",

    "3. **Fill out the registration form with accurate details**: You will be required to provide essential information such as your name, date of birth, PAN (Permanent Account Number), and contact details. Ensure all the data is accurate to avoid any issues with your registration. Complete the form following these guidelines: [Income Tax Registration Guidelines](https://www.incometax.gov.in/iec/foportal).",

    "4. **Verify your email and mobile number**: After filling out the registration form, you will need to verify your contact information. An OTP (One Time Password) will be sent to your mobile number and email for confirmation. Follow the instructions provided in your email to complete this step.",

    "5. **Upload necessary documents**: You will need to upload supporting documents such as proof of identity (Aadhar card, passport, etc.), proof of address (electricity bill, bank statement), and a photograph. Ensure that the documents are scanned and in the appropriate format (PDF/JPEG). Learn more about document submission here: [Document Upload Guidelines](https://www.incometax.gov.in/iec/foportal).",

    "6. **Complete any additional verification steps**: Some cases might require additional verification such as biometric verification or document authentication. This varies based on the applicant's circumstances. Make sure to check the details in the application portal. Refer to the [e-Filing Portal FAQs](https://www.incometax.gov.in/iec/foportal) for further details.",

    "7. **Submit the registration form**: After completing the registration form and uploading the necessary documents, you can submit your application. Once submitted, the portal will generate an acknowledgment receipt with your application number. You can track the status of your application at any time through the portal: [Track Application Status](https://www.incometax.gov.in/iec/foportal).",

    "8. **Receive your TRT (Taxpayer Registration Token) via email**: After the successful processing of your application, you will receive your TRT via email. Keep this token safe as it is used for subsequent tax-related activities. You can also download your TRT from the portal by visiting the [Download Your TRT](https://www.incometax.gov.in/iec/foportal).",

    "9. **Post-Registration Actions**: Once your TRT is received, you can use it to file your taxes, apply for GSTIN (if required), and perform other tax-related activities. Ensure that you keep the registration details handy for any future reference.",
  ],
  "TIN (Taxpayer Identification Number)": [
    "1. **Gather necessary documents**: Prepare essential documents such as proof of identity (Aadhaar card, passport, etc.), proof of address (utility bills, lease agreements), and business registration details. You may also need your PAN (Permanent Account Number) if applying as an individual or business.",

    "2. **Visit the official TIN portal**: Navigate to the NSDL TIN website, which is the authorized portal for TIN applications in India. You can access it here: [NSDL TIN Portal](https://www.tin-nsdl.com).",

    "3. **Select the application type**: Choose the appropriate application based on whether you are applying for VAT, CST, or other tax-related registrations. For new registrations, click on 'TIN Registration' under the relevant section.",

    "4. **Fill out the application form**: Enter accurate details such as your name, business type, business address, and other required information. Ensure the details match your supporting documents to avoid rejections. Refer to this guide: [TIN Application Instructions](https://www.tin-nsdl.com/services/tax-information-network.php).",

    "5. **Upload supporting documents**: Attach scanned copies of your identity proof, address proof, and business registration certificates as required. Make sure the documents are in the prescribed format (PDF/JPEG) and within the file size limits.",

    "6. **Pay the application fee (if applicable)**: Some states may require a nominal fee for TIN registration. Payment can typically be made online through net banking, debit/credit cards, or UPI. Check the fee details for your state: [State-Wise TIN Registration Guidelines](https://www.tin-nsdl.com/tin_registration_guidelines.php).",

    "7. **Submit the application**: Once all details are filled and documents uploaded, review the application and submit it online. Upon successful submission, you will receive an acknowledgment number, which you can use to track your application status.",

    "8. **Verification and processing**: The concerned tax authorities will verify the details and documents provided. This may involve both online and physical verification, depending on your location and business type. Ensure you are reachable for any follow-up queries.",

    "9. **Receive your TIN**: After successful verification, your TIN will be issued and sent to your registered email. You can also download your TIN certificate from the portal by logging into your account. Learn more here: [TIN FAQs](https://www.tin-nsdl.com/tin_faqs.php).",

    "10. **Post-registration actions**: With your TIN, you can now legally conduct business, file taxes, and comply with GST or other tax regulations as applicable. Ensure timely renewal or updates to your TIN details when required.",
  ],
  "PAN (Permanent Account Number)": [
    "1. **Visit the official PAN application website**: Navigate to either the NSDL [PAN Portal](https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html) or UTIITSL [PAN Application Portal](https://www.pan.utiitsl.com/PAN/). Both are authorized portals for PAN applications.",

    "2. **Choose the application type**: Select the appropriate form based on your status: Form 49A for Indian citizens or Form 49AA for foreigners. Click on 'Apply Online' to proceed.",

    "3. **Fill in the application form**: Provide accurate personal details such as name, date of birth, father’s name, gender, and contact information. Ensure the spelling matches the supporting documents. Refer to the guidelines for filling PAN forms here: [PAN Form Instructions](https://www.incometaxindia.gov.in/Pages/tax-information-services.aspx).",

    "4. **Upload required documents**: Attach scanned copies of the following: \n" +
      "   - Proof of Identity (Aadhaar, Passport, Voter ID, etc.)\n" +
      "   - Proof of Address (utility bill, bank statement, etc.)\n" +
      "   - Proof of Date of Birth (birth certificate, matriculation certificate, etc.). Ensure the documents are in the specified format and size.",

    "5. **Pay the application fee**: Make an online payment for the application. \n" +
      "   - For an e-PAN (digital PAN card): INR 66 (inclusive of GST)\n" +
      "   - For a physical PAN card (delivery within India): INR 107\n" +
      "   - For delivery outside India: INR 1,017. Payment options include debit/credit cards, net banking, or UPI. More details can be found here: [Fee Structure for PAN](https://www.tin-nsdl.com/services/pan/payment.php).",

    "6. **Submit the application form**: After payment, submit the form online. You will receive an acknowledgment number (15 digits) for tracking your application status.",

    "7. **Verify details and e-Sign the form**: Use Aadhaar-based OTP verification or download the form, sign it manually, and send it to the NSDL/UTIITSL office if applicable. Instructions for this process are available here: [PAN e-Sign Guidelines](https://www.pan.utiitsl.com/PAN/).",

    "8. **Track your application status online**: Use the acknowledgment number to track your PAN application status at the [NSDL PAN Status Tracking](https://www.tin-nsdl.com/pan/track-pan-status.php) or [UTIITSL Tracking Page](https://www.trackpan.utiitsl.com/PANONLINE/#forward).",

    "9. **Receive your PAN card**: Once verified, your PAN card will be delivered to your registered address or emailed as an e-PAN, depending on the option chosen during application. Typically, this takes 15-20 business days.",
  ],
  "VAT Registration": [
    "1. **Register your business on the VAT portal**: Go to the official tax authority portal for your country. For example, in India, visit the [GST Portal](https://www.gst.gov.in/) to register your business for VAT/GST.",

    "2. **Provide details about your business operations and turnover**: Fill in the registration form with accurate information about:\n" +
      "   - Business name and address\n" +
      "   - Business activity (e.g., goods or services provided)\n" +
      "   - Annual turnover (check if it meets the VAT threshold for mandatory registration in your country).",

    "3. **Submit required documents**: Upload the necessary documents, which may include:\n" +
      "   - Business registration proof (Certificate of Incorporation, partnership deed, etc.)\n" +
      "   - Identity proof (Aadhaar, PAN, passport, etc.)\n" +
      "   - Address proof of the business (utility bill, rental agreement, etc.)\n" +
      "   - Bank account details (cancelled cheque, bank statement).",

    "4. **Pay any applicable fees**: Some countries charge a nominal fee for VAT registration. Check the fee structure on the portal or with your tax consultant. Payment can usually be made online via net banking, credit/debit cards, or UPI.",

    "5. **Verification and approval**: Once you submit the application, the tax authority will verify the information and documents provided. If required, they may schedule an inspection or seek additional details.",

    "6. **Receive your VAT registration certificate**: Upon successful verification, you will receive a VAT registration certificate with your VAT Identification Number (VATIN). This will be sent to your registered email or be downloadable from the portal.",

    "7. **Compliance post-registration**: After registration, you are required to:\n" +
      "   - Display your VATIN on invoices and receipts.\n" +
      "   - File VAT returns periodically (monthly, quarterly, or annually as applicable).\n" +
      "   - Collect VAT on taxable goods and services and remit it to the government.",
  ],
  "GSTIN (Goods and Services Tax Identification Number)": [
    "1. **Log in to the GST portal and create an account**: \n" +
      "   - Visit the official [GST Portal](https://www.gst.gov.in/).\n" +
      "   - Register as a new user by entering your PAN, email, and mobile number.\n" +
      "   - Verify your credentials with an OTP and set up a username and password.",

    "2. **Fill out the GST application form with business details**: \n" +
      "   - Log in to your account and navigate to the 'Services' section.\n" +
      "   - Select 'New Registration' and fill out details such as:\n" +
      "     - Business name and address\n" +
      "     - Constitution of business (e.g., sole proprietor, partnership, etc.)\n" +
      "     - Business activity (e.g., goods or services provided)\n" +
      "     - PAN details of the business.",

    "3. **Upload supporting documents**: \n" +
      "   - Ensure that you have the following documents ready:\n" +
      "     - **Business Registration Certificate**: Proof of registration of the business.\n" +
      "     - **Identity and Address Proof**: Aadhaar card, PAN, passport, or voter ID.\n" +
      "     - **Bank Account Proof**: Cancelled cheque or bank statement.\n" +
      "     - **Address Proof of Business**: Rental agreement, utility bill, or property tax receipt.",

    "4. **Submit the application and complete the verification process**: \n" +
      "   - After completing the form and uploading documents, submit the application.\n" +
      "   - The system will generate an **Application Reference Number (ARN)** for tracking.\n" +
      "   - Verification involves:\n" +
      "     - Aadhaar authentication via OTP\n" +
      "     - Document validation by the GST officer.",

    "5. **Receive your GSTIN number after approval**: \n" +
      "   - Once the GST officer approves your application, your GSTIN will be issued.\n" +
      "   - You will receive the GSTIN on your registered email and can download the GST certificate from the portal.",

    "6. **Post-registration compliance**: \n" +
      "   - Maintain proper records of sales, purchases, and input tax credit.\n" +
      "   - File GST returns periodically (monthly, quarterly, or annually, based on turnover).\n" +
      "   - Display your GSTIN on invoices and business premises.",
  ],
  "EIN (Employer Identification Number)": [
    "1. **Visit the IRS website and navigate to EIN application**: \n" +
      "   - Open the [IRS EIN Assistant Portal](https://sa.www4.irs.gov/modiein/individual/index.jsp).\n" +
      "   - Ensure you meet the eligibility requirements, including:\n" +
      "     - Having a valid Taxpayer Identification Number (SSN or ITIN).\n" +
      "     - Applying during the portal's operating hours (Monday to Friday, 7 AM - 10 PM EST).",

    "2. **Provide necessary business information**: \n" +
      "   - Select the type of entity (e.g., sole proprietorship, partnership, corporation).\n" +
      "   - Fill in details about the structure of the business, such as:\n" +
      "     - Business name and trade name (if applicable).\n" +
      "     - Address of the business.\n" +
      "     - Reason for applying (e.g., hiring employees, opening a bank account, or changing business structure).",

    "3. **Complete the online form and submit it**: \n" +
      "   - Continue filling out the EIN application form, ensuring:\n" +
      "     - The responsible party (individual or entity) is correctly identified.\n" +
      "     - Business operations details are accurate.\n" +
      "   - Review the form to avoid errors and submit it online.",

    "4. **Receive your EIN immediately upon approval**: \n" +
      "   - Once the application is approved, the EIN will be displayed on the screen.\n" +
      "   - Download or print the confirmation notice for your records.\n" +
      "   - The IRS will also send an official confirmation letter via mail to the business address.",

    "5. **Post-EIN compliance**: \n" +
      "   - Use your EIN for tax filing, business registration, and opening a bank account.\n" +
      "   - Keep the EIN confirmation document secure, as it may be needed for official purposes in the future.",
  ],
  "TAN (Tax Deduction and Collection Account Number)": [
    "1. **Go to the official tax portal and select TAN application**: \n" +
      "   - Open the [NSDL TAN Application Portal](https://www.tin-nsdl.com/).\n" +
      "   - Navigate to the 'TAN' section and choose the appropriate form (Form 49B for new TAN applications).",

    "2. **Fill out the required form with your business or personal details**: \n" +
      "   - Provide necessary details such as:\n" +
      "     - Applicant type (individual, company, or partnership).\n" +
      "     - Business name, address, and contact details.\n" +
      "     - Nature of business and reasons for TAN application.",

    "3. **Upload identity proof and address proof**: \n" +
      "   - Documents required include:\n" +
      "     - Identity proof (e.g., Aadhaar card, PAN card).\n" +
      "     - Address proof (e.g., utility bill, bank statement).\n" +
      "   - Ensure the documents are scanned and in an acceptable format (PDF or JPEG).",

    "4. **Pay the application fee and submit the form**: \n" +
      "   - Use online payment methods such as:\n" +
      "     - Credit/debit cards.\n" +
      "     - Net banking or UPI.\n" +
      "   - Note the acknowledgment number provided after successful payment.",

    "5. **Receive your TAN via email or postal mail**: \n" +
      "   - The TAN application will be processed within a few business days.\n" +
      "   - Once approved, your TAN will be sent via:\n" +
      "     - Email (for online applicants).\n" +
      "     - Postal mail to the address provided.",
  ],
  "SSN (Social Security Number)": [
    "1. **Visit the Social Security Administration (SSA) office or website**: \n" +
      "   - Go to the [official SSA website](https://www.ssa.gov/).\n" +
      "   - Locate the nearest SSA office using their office locator tool, or decide to apply online if eligible.",

    "2. **Fill out the application form for an SSN**: \n" +
      "   - Download and complete Form SS-5 (Application for a Social Security Card).\n" +
      "   - Ensure all information is accurate and legible, including:\n" +
      "     - Full name\n" +
      "     - Date of birth\n" +
      "     - Place of birth\n" +
      "     - Parent names (for first-time applicants).",

    "3. **Submit necessary documents (proof of identity, age, and citizenship)**: \n" +
      "   - Gather original documents or certified copies to support your application:\n" +
      "     - Proof of identity: Driver's license, passport, or state-issued ID card.\n" +
      "     - Proof of age: Birth certificate or hospital birth record.\n" +
      "     - Proof of U.S. citizenship or lawful residency: U.S. passport, Certificate of Naturalization, or green card.\n" +
      "   - Submit the completed application and documents in person or by mail (if allowed).",

    "4. **Track your application and receive your SSN card**: \n" +
      "   - The SSA will process your application within 2–4 weeks.\n" +
      "   - Track your application status by contacting the SSA or visiting their office.\n" +
      "   - Receive your SSN card by mail at the address provided in the application.",
  ],
  "UTR (Unique Taxpayer Reference)": [
    "1. **Sign up on the official tax portal for self-assessment**: \n" +
      "   - Visit the [HMRC self-assessment page](https://www.gov.uk/log-in-file-self-assessment-tax-return) for the UK.\n" +
      "   - Log in or create an account using your Government Gateway credentials.\n" +
      "   - Select 'Register for Self Assessment' to begin the process.",

    "2. **Provide personal or business details as required**: \n" +
      "   - Enter your details based on the type of taxpayer you are:\n" +
      "     - For individuals: Name, date of birth, and National Insurance number.\n" +
      "     - For businesses: Business name, address, and type of business entity.\n" +
      "   - Ensure all information is accurate to avoid delays.",

    "3. **Submit any supporting documentation**: \n" +
      "   - Upload or mail required documents:\n" +
      "     - Proof of identity (passport, driver's license).\n" +
      "     - Address proof (utility bill, bank statement).\n" +
      "     - For businesses: Incorporation certificate or partnership agreement.",

    "4. **Receive your UTR number via post or email**: \n" +
      "   - After submission, HMRC will process your application within 10 working days.\n" +
      "   - Track your application by contacting the HMRC helpline at 0300 200 3310.\n" +
      "   - Receive your UTR number by post or email (depending on the method you selected).",
  ],
  "Tax Residency Certificate": [
    "1. **Log in to the tax authority's portal**: \n" +
      "   - Go to your country's tax authority website. For example:\n" +
      "     - India: [Income Tax Department](https://incometaxindiaefiling.gov.in/)\n" +
      "     - USA: [IRS Website](https://www.irs.gov/)\n" +
      "     - UK: [HMRC Website](https://www.gov.uk/government/organisations/hm-revenue-customs)\n" +
      "   - Register or log in with your credentials to access your tax records.",

    "2. **Apply for a tax residency certificate under the specified section**: \n" +
      "   - Locate the section for applying for a tax residency certificate. This might be under 'Certificates', 'Tax Residency', or 'International Taxation'.\n" +
      "   - Fill out the application form with your details, including your residential status, tax identification number (TIN), and relevant dates.",

    "3. **Upload proof of residence and income details**: \n" +
      "   - You will need to submit proof of your residence (utility bills, lease agreements, or government-issued identification). Also, provide income details for the required period (tax returns, salary slips, etc.).\n" +
      "   - Ensure all documents are clear and legible before uploading.",

    "4. **Pay applicable fees and submit your application**: \n" +
      "   - Some tax authorities may charge a fee for processing the application. Check for applicable fees on the portal.\n" +
      "   - Make the payment via available payment methods (credit card, net banking, etc.) and submit your application.",

    "5. **Download the certificate once issued**: \n" +
      "   - After submission, your application will be reviewed. You will receive the certificate either by email or be able to download it directly from the portal.\n" +
      "   - Ensure to save and print the certificate for your records.",
  ],
  "Business Tax Clearance Certificate": [
    "1. **Visit the Tax Authority Office or Online Portal**: \n" +
      "   - Go to the relevant tax authority's office or access the online portal for tax clearance in your country. Examples include:\n" +
      "     - **India**: [Income Tax Department - Apply for Business Tax Clearance](https://www.incometaxindia.gov.in/)\n" +
      "     - **USA**: [IRS - Apply for Tax Clearance](https://www.irs.gov/)\n" +
      "     - **UK**: [HMRC - Business Tax Clearance](https://www.gov.uk/)\n" +
      "   - Ensure you have all business registration details before proceeding.",

    "2. **Provide Your Business Tax Details and Clearance History**: \n" +
      "   - Provide details regarding your business's tax history, including returns filed, taxes paid, and any pending liabilities. This may require:\n" +
      "     - A history of tax filings.\n" +
      "     - Any outstanding tax dues, if applicable.",

    "3. **Submit the Application Form with Supporting Documents**: \n" +
      "   - Complete the application form as per the tax authority's guidelines.\n" +
      "   - Documents required might include:\n" +
      "     - Business registration details.\n" +
      "     - Proof of tax payments or exemptions.\n" +
      "     - Audited financial statements, if required.\n" +
      "   - Make sure all documents are clear and valid.",

    "4. **Track Your Application Status and Collect Your Certificate**: \n" +
      "   - Once your application is submitted, track its progress through the online portal or with the tax authority office.\n" +
      "   - Upon approval, collect your Business Tax Clearance Certificate either through email, mail, or directly from the office.",
  ],
  "Withholding Tax Certificate": [
    "1. **Apply Through the Tax Authority's Portal**: \n" +
      "   - Begin by logging into the official tax authority portal. Make sure you have registered your account, or create one if you haven't already. The portal should offer a specific section for withholding tax-related applications. Example portals include:\n" +
      "     - **India**: [Income Tax Department - Apply for Withholding Tax Certificate](https://www.incometaxindia.gov.in/)\n" +
      "     - **USA**: [IRS - Withholding Tax Certificate](https://www.irs.gov/)\n" +
      "     - **UK**: [HMRC - Apply for Withholding Tax](https://www.gov.uk/)\n" +
      "   - Ensure all your business details are updated in the portal to avoid delays.",

    "2. **Provide Your Withholding Tax Payment Details**: \n" +
      "   - You will need to enter the details of your withholding tax payments. This includes:\n" +
      "     - Amount of tax withheld.\n" +
      "     - Date of payment.\n" +
      "     - The taxpayer identification number (TIN) or the reference number of the tax payment.\n" +
      "   - Make sure to gather all necessary payment documents and receipts to ensure accuracy.",

    "3. **Submit Supporting Documents and Complete the Verification**: \n" +
      "   - After providing payment details, you will be asked to submit additional documents for verification. These may include:\n" +
      "     - Proof of tax payments.\n" +
      "     - Copies of invoices or contracts related to the withholding tax.\n" +
      "     - Identification documents, such as a TIN or PAN card.\n" +
      "   - You may also need to provide financial statements or audit reports, depending on the country’s requirements.",

    "4. **Receive Your Certificate Once Approved**: \n" +
      "   - Once your application has been verified and processed, the withholding tax certificate will be issued. You can receive this certificate by:\n" +
      "     - Email, if the system allows electronic certificates.\n" +
      "     - Postal mail, depending on the tax authority's policy.\n" +
      "   - You can also track the status of your application through the portal.",
  ],
  "Income Tax Clearance Certificate": [
    "1. **Visit the Official Tax Department's Website**: \n" +
      "   - Access the official website of your country's tax authority. For example:\n" +
      "     - **India**: [Income Tax Department - Income Tax Clearance](https://www.incometaxindia.gov.in/)\n" +
      "     - **USA**: [IRS - Income Tax Clearance](https://www.irs.gov/)\n" +
      "     - **UK**: [HMRC - Apply for Income Tax Clearance](https://www.gov.uk/)\n" +
      "   - Ensure you have an active account or create one if necessary to begin the application process.",

    "2. **Complete the Application Form with Your Income Tax Details**: \n" +
      "   - The application will require detailed information about your income tax payments, including:\n" +
      "     - Your taxpayer identification number (TIN, PAN, or similar).\n" +
      "     - The financial year(s) for which you're requesting clearance.\n" +
      "     - Income details, including salary, business income, or other sources of income.\n" +
      "   - Be prepared to fill out any additional forms related to your tax history.",

    "3. **Upload Supporting Documents (Income Statement, Tax Returns, etc.)**: \n" +
      "   - You will need to upload various documents for verification. These typically include:\n" +
      "     - Your most recent income tax returns.\n" +
      "     - Financial statements (if required).\n" +
      "     - Proof of any outstanding dues or clearances.\n" +
      "     - Bank details or payment receipts for any taxes paid.\n" +
      "   - Ensure all documents are scanned clearly and in the required format (PDF, JPEG, etc.).",

    "4. **Submit the Application and Track Its Status**: \n" +
      "   - Once you've completed the form and uploaded the documents, submit the application.\n" +
      "   - You will receive an acknowledgment and a reference number.\n" +
      "   - Use the reference number to track the progress of your application via the portal.",

    "5. **Receive Your Clearance Certificate Once Verified**: \n" +
      "   - After verification, the tax department will issue the clearance certificate.\n" +
      "   - You will typically receive this certificate by email, or it can be downloaded directly from the portal.\n" +
      "   - In some cases, the clearance certificate will be sent via postal mail, depending on your location or the tax authority's policy.",
  ],
  "Property Tax Registration": [
    "1. **Visit Your Local Municipality's Website or Office**: \n" +
      "   - Begin the property tax registration process by visiting the official website or physical office of your local municipality. This can often be done online or in person, depending on your location.\n" +
      "   - **India**: Check for the local municipal corporation website, like [Mumbai Municipal Corporation](https://www.mcgm.gov.in/)\n" +
      "   - **USA**: Use your local county or city’s website, such as [New York Property Tax Services](https://www1.nyc.gov/site/finance/taxes/property-tax.page)\n" +
      "   - **UK**: Visit the relevant council website for registration or [GOV.UK](https://www.gov.uk/)\n" +
      "   - Ensure you have the correct municipality based on your property location.",

    "2. **Submit Property Ownership Details and Relevant Documents**: \n" +
      "   - The application will require details of your property, such as:\n" +
      "     - Property address.\n" +
      "     - Proof of ownership, such as a deed or sale agreement.\n" +
      "     - Any other documents related to your property’s valuation or area-specific tax rates.\n" +
      "   - Make sure all documents are scanned and uploaded as per the requirements of the municipal website.",

    "3. **Pay the Applicable Property Tax Fees**: \n" +
      "   - After submitting the property details, you will need to pay the required property tax fees. The tax amount will depend on your property’s location, size, and other factors set by the local municipality.\n" +
      "   - Payment can usually be made online through the municipality’s portal, via bank transfer, or at the office counter.\n" +
      "   - **India**: [Property Tax Online Payment in India](https://www.incometaxindia.gov.in/)\n" +
      "   - **USA**: Payment via [NYC Property Tax Payment Portal](https://www1.nyc.gov/site/finance/taxes/property-tax.page)",

    "4. **Receive the Property Tax Registration Certificate**: \n" +
      "   - Upon verification of the submitted documents and payment, the local tax authority will issue your property tax registration certificate.\n" +
      "   - This certificate can be sent via email or postal mail, depending on the municipality's process.\n" +
      "   - **India**: You may also be able to download it from the municipal portal directly.\n" +
      "   - **USA**: The certificate is generally mailed or can be accessed through the county’s tax portal.",
  ],
  "Professional Tax Registration": [
    "1. **Register Your Business or Profession with the Local Tax Authority**: \n" +
      "   - To begin the registration, visit your local tax authority’s official portal or office. Depending on your location, the process may vary.\n" +
      "   - **India**: For example, you can visit the [Maharashtra Professional Tax Registration Portal](https://www.mahavat.gov.in/). Professional Tax is governed by state-level laws in India, so ensure you select the appropriate state portal.\n" +
      "   - **USA/UK**: Professional Tax registration may not be applicable in all states or regions; it’s important to verify the local regulations. Check the [IRS website](https://www.irs.gov/businesses) for information on professional taxes in the USA.",

    "2. **Provide Business or Professional Details and Documents**: \n" +
      "   - Fill out the registration form with your business or professional details, including:\n" +
      "     - Business name and nature of business.\n" +
      "     - PAN or Tax ID (for businesses in India).\n" +
      "     - Address proof and identity proof of the business owner or individual.\n" +
      "     - Any other documents as required by your local authority.\n" +
      "   - Ensure all documents are valid and properly scanned for submission.",

    "3. **Pay the Professional Tax Registration Fees**: \n" +
      "   - Professional tax registration fees vary depending on the region and the size of your business or profession.\n" +
      "   - **India**: You may need to pay an initial registration fee and annual professional tax, which can be done through the local municipal or state authority's portal.\n" +
      "   - **USA/UK**: Depending on the region, there may be similar fees applicable to professionals or businesses. Make sure to check your local tax authority’s website.\n" +
      "   - **India**: Payment can be made through online portals like [Maharashtra Tax Payment Portal](https://www.mahavat.gov.in/).",

    "4. **Receive Your Professional Tax Certificate**: \n" +
      "   - Once your application is processed and the fees are paid, you will receive your professional tax registration certificate.\n" +
      "   - The certificate is usually sent via email or postal mail, or you might be able to download it from the registration portal.\n" +
      "   - **India**: Once verified, the certificate can be downloaded from the respective state's tax portal.",
  ],
  "Customs Duty Identification": [
    "1. **Apply through the Customs Department's Website**: \n" +
      "   - Visit the official customs website of your country. For example, in India, you can access the [Indian Customs Department Portal](https://www.cbic.gov.in/). If you are in another country, search for the official customs authority website.\n" +
      "   - Look for the 'Customs Duty Identification' section or any related links that guide you through the application process.\n" +
      "   - Some countries may require registration with their customs system to begin applying for a duty identification number.",

    "2. **Provide Business or Individual Identification Details**: \n" +
      "   - Provide your business or individual details, such as:\n" +
      "     - Business name, type, and address (for businesses).\n" +
      "     - Personal identification details, such as name, nationality, and contact information (for individuals).\n" +
      "   - Ensure that the information matches the documents you are submitting.\n" +
      "   - You may also need to enter your tax ID, PAN (for India), or any other unique business registration identifiers.",

    "3. **Submit Necessary Documents**: \n" +
      "   - You will be required to submit various documents to verify your identity and business operations. These could include:\n" +
      "     - **Business Registration Certificate**: Proof that your business is legally registered.\n" +
      "     - **Tax Registration or Compliance Documents**: These may include GST registration (for India), business tax compliance certificates, or similar documents for other countries.\n" +
      "     - **ID Proof**: Personal identification documents like a passport, voter ID, or any government-issued identification card.\n" +
      "     - **Address Proof**: Documents like utility bills, bank statements, etc., to verify your business or residential address.",

    "4. **Pay Any Fees and Receive Your Customs Duty Identification Number**: \n" +
      "   - Some jurisdictions may require a fee for the processing of your Customs Duty Identification Number (CDIN).\n" +
      "   - Fees can often be paid online through the customs portal.\n" +
      "   - After the successful application and payment, you will receive your Customs Duty Identification Number (CDIN), either through email or directly available for download from the portal.",
  ],
  "Excise Tax Permit": [
    "1. **Visit the Excise Department's Portal or Office**: \n" +
      "   - Access the official excise department portal in your country or visit the local excise office to start the process. For example, in India, the [Central Excise Department Portal](https://www.cbic.gov.in/) provides detailed instructions and online application options.\n" +
      "   - If online application is not available, visiting the local office may be necessary to obtain and submit the application form.",

    "2. **Submit an Application Form with Required Business Details**: \n" +
      "   - Complete the application form, providing accurate business information, such as:\n" +
      "     - Business name and type (e.g., manufacturing, service, etc.).\n" +
      "     - Location of your business and its operational scope.\n" +
      "   - Some jurisdictions may require specific details about the goods or services subject to excise tax.",

    "3. **Provide Documents Like Tax Details and Business License**: \n" +
      "   - Submit supporting documents required for your excise tax application, such as:\n" +
      "     - **Tax Registration or Compliance Documents**: Any proof of tax registration or compliance, such as a GST certificate (for India) or similar.\n" +
      "     - **Business License**: Proof that your business is legally authorized to operate.\n" +
      "     - **Other Relevant Documents**: Any additional documents requested by the excise department, such as proof of operations, tax history, etc.",

    "4. **Pay the Excise Tax Permit Fee and Receive Your Permit**: \n" +
      "   - Pay any required fees for the excise tax permit. The fee payment can typically be made online through the excise department’s portal or offline at the department’s office.\n" +
      "   - After the payment is processed and your application is reviewed, you will receive your **Excise Tax Permit** either through email, post, or you may be required to collect it from the excise department.",

    "5. **Additional Steps**: \n" +
      "   - Access the official excise department portal in your country or visit the local excise office to start the process. For example, in India, the [Central Excise Department Portal](https://www.cbic.gov.in/) provides detailed instructions and online application options.\n" +
      "   - If online application is not available, visiting the local office may be necessary to obtain and submit the application form.",
  ],
  "Tax Exemption Certificate": [
    "1. **Apply Through the Official Tax Portal**: \n" +
      "   - Visit the official website of the tax authority of your country. For example, in India, the [Income Tax Department Portal](https://www.incometaxindia.gov.in/) allows you to apply for tax exemptions.\n" +
      "   - Search for the 'Tax Exemption Certificate' section under the relevant category like 'Taxpayer Services' or 'Exemptions'.",

    "2. **Provide Necessary Documentation Proving Eligibility for Tax Exemption**: \n" +
      "   - Gather all the required documentation to prove your eligibility for tax exemption. This can include:\n" +
      "     - Proof of income (if you're claiming a deduction based on income).\n" +
      "     - Proof of the organization’s nonprofit status (for charitable organizations).\n" +
      "     - Other documents such as tax returns, balance sheets, or financial statements depending on the reason for the exemption.\n" +
      "   - Ensure all documents meet the specifications mentioned by the tax authority.",

    "3. **Submit Your Application and Wait for Approval**: \n" +
      "   - Fill out and submit the online application form with all the necessary documents attached. Double-check the form for accuracy before submission.\n" +
      "   - After submission, the tax authority will review your application. This process might take time depending on their internal procedures and the complexity of your request.",

    "4. **Receive Your Tax Exemption Certificate**: \n" +
      "   - Once your application is approved, you will receive your Tax Exemption Certificate either via email or it will be available for download on the portal.\n" +
      "   - In some cases, you may also receive a physical copy of the certificate depending on the country or region's process.",
  ],
  "Capital Gains Tax Registration": [
    "1. **Visit the Tax Department's Portal for Capital Gains Registration**: \n" +
      "   - Go to your country's tax department portal. For example, in India, you can visit the [Income Tax Department Portal](https://www.incometaxindia.gov.in/). For the U.S., you would visit the IRS portal at [www.irs.gov](https://www.irs.gov/). Find the section related to 'Capital Gains' under the taxes section or self-assessment section.",

    "2. **Provide Your Financial Details Related to Capital Gains**: \n" +
      "   - Enter all relevant financial details regarding your capital gains. This includes information on the sale of assets, any profits or losses, and other capital gains-related income.\n" +
      "   - Ensure the information you provide is accurate and up-to-date, as discrepancies may lead to delays or rejections in the registration process.",

    "3. **Upload Supporting Documents Like Asset Purchase and Sale Details**: \n" +
      "   - Upload documents that substantiate your capital gains transactions. This could include:\n" +
      "     - Proof of purchase of assets (e.g., invoices, contracts).\n" +
      "     - Proof of sale (e.g., sale agreement, payment receipts).\n" +
      "     - Any additional tax documents (e.g., previous tax filings, financial statements).",

    "4. **Pay Any Fees and Receive Your Capital Gains Tax Registration**: \n" +
      "   - Complete the payment for any registration or processing fees required by the tax authority. Fees can vary by country and asset type.\n" +
      "   - After completing payment, submit the application. Once approved, you will receive your Capital Gains Tax Registration number or certificate via email or can download it from the portal.",
  ],
  "Payroll Tax Registration": [
    "1. **Register Your Business for Payroll Tax Through the Relevant Portal**: \n" +
      "   - Start by visiting the official portal for payroll tax registration. The registration portal differs by country and region. For example, in the United States, you would visit the [IRS Payroll Tax Portal](https://www.irs.gov/businesses/small-businesses-self-employed). In the UK, you would use [HMRC's PAYE registration page](https://www.gov.uk/register-employer). The portal will allow you to create an account and start the payroll registration process.",

    "2. **Provide Employee Details and Business Information**: \n" +
      "   - Enter detailed information about your business and employees. This includes:\n" +
      "     - Business details (name, address, and business registration number).\n" +
      "     - Employee details (names, job titles, salaries, and tax identification numbers).\n" +
      "     - You may also be required to provide additional documents such as employment contracts or proof of business registration.",

    "3. **Pay the Payroll Tax Registration Fee**: \n" +
      "   - In some countries, a registration fee for payroll tax may apply. Make sure to complete the payment process to finalize the registration. Payment details are usually collected directly through the portal during the registration process. Be sure to check the fee structure for your specific jurisdiction.",

    "4. **Receive Your Payroll Tax Registration Certificate**: \n" +
      "   - Once your application is submitted and processed, you will receive your payroll tax registration certificate. This may be sent via email or made available for download through the portal. Keep this certificate for your records, as it is proof that your business is compliant with payroll tax obligations.",
  ],
  "Exporter/Importer Tax Identification": [
    "1. **Apply on the Relevant Customs or Tax Authority's Portal**: \n" +
      "   - The first step is to visit the official customs or tax authority website relevant to your country. For instance, in the United States, you would go through the [U.S. Customs and Border Protection (CBP)](https://www.cbp.gov/) for import/export-related registrations. In India, the [Directorate General of Foreign Trade (DGFT)](https://www.dgft.gov.in/) is used for registering as an exporter/importer. Each country will have a designated portal for such applications.",

    "2. **Provide Your Business Details as an Exporter/Importer**: \n" +
      "   - Enter your business details, such as the name of the company, business registration number, and address. You will also need to provide your Importer Exporter Code (IEC) if it is required for your country. Some countries may ask for additional business-specific data, such as the nature of goods being imported or exported.",

    "3. **Submit Supporting Documents Like Registration and Financial Details**: \n" +
      "   - Prepare and upload supporting documents, such as:\n" +
      "     - Business registration certificate.\n" +
      "     - Financial statements or tax returns.\n" +
      "     - Proof of ownership or lease for business premises.\n" +
      "     - Bank account details.\n" +
      "     - Any other documents as required by the customs or tax authority.\n" +
      "   These documents help verify your legitimacy as an importer or exporter.",

    "4. **Receive Your Tax Identification Number**: \n" +
      "   - After submitting the required documents and completing the application, you will receive your Exporter/Importer Tax Identification Number (TIN). This number is crucial for your international trade and tax compliance. It is typically sent to you via email or made available for download through the portal.",
  ],
  "Digital Taxpayer Certificate": [
    "1. **Apply Through the Official Tax Authority's Digital Portal**: \n" +
      "   - To apply for a Digital Taxpayer Certificate, visit the official online portal of your country's tax authority. Many countries, like India (through the [Income Tax Department portal](https://www.incometaxindiaefiling.gov.in/)) and the United States (through the [IRS online portal](https://www.irs.gov/)), have dedicated portals for tax-related certifications. Make sure to create an account or log in with your taxpayer ID details.",

    "2. **Provide Necessary Business or Personal Information**: \n" +
      "   - You will need to fill out a form providing key details about your business or personal tax situation. This includes your business registration number or personal identification number (e.g., PAN in India or SSN in the U.S.), along with other relevant details depending on the country's requirements.",

    "3. **Submit Identification and Proof of Tax Payment**: \n" +
      "   - Prepare and upload necessary documents to verify your tax status. This typically includes:\n" +
      "     - Valid identification (e.g., government-issued ID, PAN, or Social Security Number).\n" +
      "     - Proof of tax payments or tax returns (e.g., filed returns, payment receipts, etc.).\n" +
      "   Make sure the documents are clear and legible for verification.",

    "4. **Receive Your Digital Taxpayer Certificate Upon Approval**: \n" +
      "   - Once your application has been processed and approved, the tax authority will issue your Digital Taxpayer Certificate. It is typically sent to you via email or made available for download directly from the portal.",
  ],
};

export default function HowToApply() {
  const [selectedOption, setSelectedOption] = useState("TRT");

  return (
    <div className="max-w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <motion.div
        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg h-full max-h-[600px] overflow-y-auto lg:col-span-1"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
        }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-blue-400">
          How to Apply
        </h2>
        <motion.ul
          className="space-y-4"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {applicationOptions.map((option) => (
            <motion.li
              key={option}
              className={`cursor-pointer p-3 rounded-md transition-all duration-300 ease-in-out ${
                selectedOption === option
                  ? "bg-blue-600 text-white border-2 border-blue-500 scale-105"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setSelectedOption(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Steps and Details */}
      <motion.div
        className="bg-gray-900 text-white p-6 rounded-lg shadow-xl lg:col-span-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 sticky top-0 z-10 bg-gray-900 p-4">
          Steps to Apply for {selectedOption}
        </h2>

        <motion.div
          className="overflow-y-auto scroll-smooth space-y-4 max-h-[600px]"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.3 }}
        >
          {(
            (applicationSteps as { [key: string]: string[] })[
              selectedOption
            ] || ["Details not available for this option."]
          ).map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-6 rounded-lg border-2 border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.3,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon for each step */}
              <motion.div
                className="flex-shrink-0 bg-blue-600 text-white p-3 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              {/* Step description */}
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {step}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

const paths = {
  appealStarted: {
    name: '/name',
    nationality: '/nationality',
    dob: '/date-birth',
    enterPostcode: '/address',
    enterAddress: '/manual-address',
    postcodeLookup: '/select-address',
    details: '/home-office-reference-number',
    letterSent: '/date-letter-sent',
    appealLate: '/late-appeal',
    uploadEvidence: '/home-office/upload-evidence',
    deleteEvidence: '/home-office/delete-evidence',
    typeOfAppeal: '/appeal-type',
    contactDetails: '/contact-preferences',
    checkAndSend: '/check-answers',
    taskList: '/about-appeal'
  },
  appealSubmitted: {
    confirmation: '/appeals-details-sent'
  },
  awaitingReasonsForAppeal: {
    decision: '/case-building/home-office-decision-wrong',
    supportingEvidence: '/case-building/supporting-evidence',
    supportingEvidenceUpload: '/case-building/provide-supporting-evidence',
    supportingEvidenceUploadFile: '/case-building/reason-for-appeal/supporting-evidence/upload/file',
    supportingEvidenceDeleteFile: '/case-building/reason-for-appeal/supporting-evidence/delete/file',
    supportingEvidenceSubmit: '/case-building/reason-for-appeal/supporting-evidence/submit',
    checkAndSend: '/case-building/check-answer'
  },
  reasonsForAppealSubmitted: {
    confirmation: '/case-building/answer-sent'
  },
  awaitingClarifyingQuestionsAnswers: {
    questionsList: '/questions-about-appeal',
    question: '/question/:id',
    supportingEvidenceQuestion: '/clarifying-questions/supporting-evidence/:id',
    supportingEvidenceUploadFile: '/clarifying-questions/upload-evidence/:id',
    supportingEvidenceDeleteFile: '/clarifying-questions/delete-evidence/:id/',
    supportingEvidenceSubmit: '/clarifying-questions/submit/:id',
    anythingElse: '/anything-else',
    anythingElseQuestionPage: '/anything-else-question',
    anythingElseAnswerPage: '/anything-else-answer',
    checkAndSend: '/check-your-answers'
  },
  clarifyingQuestionsAnswersSubmitted: {
    confirmation: '/clarifying-questions-sent'
  },
  awaitingCmaRequirements: {
    taskList: '/appointment-needs',
    accessNeeds: '/appointment-access-needs',
    accessNeedsInterpreter: '/appointment-interpreter',
    accessNeedsStepFreeAccess: '/appointment-step-free-access',
    accessNeedsHearingLoop: '/appointment-hearing-loop',
    accessNeedsAdditionalLanguage: '/appointment-add-language-details',
    otherNeeds: '/appointment-other-needs',
    otherNeedsMultimediaEvidenceQuestion: '/appointment-multimedia-evidence',
    otherNeedsMultimediaEquipmentQuestion: '/appointment-multimedia-evidence-equipment',
    otherNeedsMultimediaEquipmentReason: '/appointment-multimedia-evidence-equipment-reasons',
    otherNeedsSingleSexAppointment: '/appointment-single-sex',
    otherNeedsSingleSexTypeAppointment: '/appointment-single-sex-type',
    otherNeedsAllMaleAppointment: '/appointment-single-sex-type-male',
    otherNeedsAllFemaleAppointment: '/appointment-single-sex-type-female',
    otherNeedsPrivateAppointment: '/appointment-private',
    otherNeedsPrivateAppointmentReason : '/appointment-private-reasons',
    otherNeedsHealthConditions: '/appointment-physical-mental-health',
    otherNeedsHealthConditionsReason: '/appointment-physical-mental-health-reasons',
    otherNeedsPastExperiences: '/appointment-past-experiences',
    otherNeedsPastExperiencesReasons: '/appointment-past-experiences-reasons',
    otherNeedsAnythingElse: '/appointment-anything-else',
    otherNeedsAnythingElseReasons: '/appointment-anything-else-reasons',
    datesToAvoidQuestion: '/appointment-dates-avoid',
    datesToAvoidEnterDate: '/appointment-dates-avoid-enter',
    datesToAvoidEnterDateWithId: '/appointment-dates-avoid-enter/:id',
    datesToAvoidReason: '/appointment-dates-avoid-reasons',
    datesToAvoidReasonWithId: '/appointment-dates-avoid-reasons/:id',
    datesToAvoidAddAnotherDate: '/appointment-dates-avoid-new',
    checkAndSend: '/appointment-check-answers'
  },
  cmaRequirementsSubmitted: {
    confirmation: '/appointment-success'
  },
  common: {
    // index, start, idam endpoints and overview
    index: '/',
    login: '/login',
    logout: '/logout',
    redirectUrl: '/redirectUrl',
    start: '/start-appeal',
    overview: '/appeal-overview',
    fileNotFound: '/file-not-found',
    yourCQanswers: '/your-answers',

    // Health endpoints
    health: '/health',
    liveness: '/liveness',
    healthLiveness: '/health/liveness',
    healthReadiness: '/health/readiness',

    // Eligibility Questions endpoints
    ineligible: '/not-eligible',
    questions: '/eligibility',
    eligible: '/eligible',

    // Viewers endpoints
    detailsViewers: {
      document: '/view/document',
      homeOfficeDocuments: '/view/home-office-documents',
      appealDetails: '/appeal-details',
      reasonsForAppeal: '/appeal-reasons',
      timeExtension: '/view/time-extension',
      timeExtensionDecision: '/view/time-extension-decision',
      cmaRequirementsAnswer: '/your-appointment-needs'
    },

    // Ask for more time
    askForMoreTime: {
      reason: '/ask-for-more-time',
      cancel: '/ask-for-more-time-cancel',
      evidenceYesNo: '/supporting-evidence-more-time',
      supportingEvidenceUpload: '/provide-supporting-evidence-more-time',
      supportingEvidenceSubmit: '/provide-supporting-evidence-more-time-submit',
      supportingEvidenceDelete: '/provide-supporting-evidence-more-time-delete',
      checkAndSend: '/check-answer-more-time',
      confirmation: '/request-more-time-sent'
    },

    // Session extension
    extendSession: '/extend-session',
    sessionExpired: '/session-ended',

    // Forbidden page endpoint
    forbidden: '/forbidden',

    // Guidance pages endpoints
    tribunalCaseworker: '/tribunal-caseworker',
    moreHelp: '/appeal-help',
    evidenceToSupportAppeal: '/supporting-evidence',
    whatIsIt: '/supporters-guidance/what-service-who',
    gettingStarted: '/supporters-guidance/getting-started',
    documents: '/supporters-guidance/documents',
    fourStages: '/supporters-guidance/four-stages-process',
    giveFeedback: '/supporters-guidance/how-give-feedback',
    notifications: '/supporters-guidance/notifications',
    howToHelp: '/supporters-guidance/how-get-help',
    guidance: '/supporters-guidance/guidance',
    offlineProcesses: '/supporters-guidance/offline-processes',
    homeOfficeDocuments: '/home-office-documents',
    whatToExpectAtCMA: '/expect-case-management-appointment',

    // Footer links
    cookies: '/cookie-policy',
    termsAndConditions: '/terms-and-conditions',
    privacyPolicy: '/privacy-policy'

  }
};
export {
  paths
};

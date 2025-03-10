import { Request } from 'express';
import _ from 'lodash';
import i18n from '../../locale/en.json';
import { States } from '../data/states';
import { paths } from '../paths';
import { getHearingCentre, getHearingDate, getHearingTime } from './cma-hearing-details';
import { getDeadline } from './event-deadline-date-finder';

/**
 * Determines whether a status is partially completed by looking at the first possible user input property.
 * @param req the request containing the session
 * @param currentAppealStatus the current appeal status.
 */
function isPartiallySavedAppeal(req: Request, currentAppealStatus: string) {
  switch (currentAppealStatus) {
    case 'appealStarted': {
      return _.has(req.session.appeal, 'application.homeOfficeRefNumber');
    }
    case 'awaitingReasonsForAppeal': {
      return _.has(req.session.appeal, 'reasonsForAppeal.applicationReason');
    }
    default: {
      return false;
    }
  }
}

/**
 * Pulls do this next content based on status
 * @param currentAppealStatus the status the appeal is currently in
 */
function getDoThisNextSectionFromAppealState(currentAppealStatus: string) {

  switch (currentAppealStatus) {
    case'appealStarted':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.appealStarted.fewQuestions,
          i18n.pages.overviewPage.doThisNext.appealStarted.needHomeOfficeDecision
        ],
        info: null,
        cta: {
          url: paths.appealStarted.taskList,
          respondByText: null
        },
        allowedAskForMoreTime: false
      };
    case 'appealStartedPartial':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.appealStarted.finishQuestions,
          i18n.pages.overviewPage.doThisNext.appealStarted.needHomeOfficeDecision
        ],
        info: null,
        cta: {
          url: paths.appealStarted.taskList,
          respondByText: null
        },
        allowedAskForMoreTime: false
      };
    case 'appealSubmitted':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.appealSubmitted.detailsSent,
          i18n.pages.overviewPage.doThisNext.appealSubmitted.dueDate
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.appealSubmitted.info.title,
          url: i18n.pages.overviewPage.doThisNext.appealSubmitted.info.url
        },
        cta: null,
        allowedAskForMoreTime: false
      };
    case 'awaitingRespondentEvidence':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.awaitingRespondentEvidence.detailsSent,
          i18n.pages.overviewPage.doThisNext.awaitingRespondentEvidence.dueDate
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.awaitingRespondentEvidence.info.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingRespondentEvidence.info.url
        },
        cta: null,
        allowedAskForMoreTime: false
      };
    case 'awaitingReasonsForAppeal':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.description
        ],
        descriptionParagraphsAskForMoreTime: [
          i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.descriptionAskForMoreTime
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.info.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.info.url
        },
        usefulDocuments: {
          title: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.usefulDocuments.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.usefulDocuments.url
        },
        cta: {
          url: paths.awaitingReasonsForAppeal.decision,
          respondByText: i18n.pages.overviewPage.doThisNext.respondByText,
          respondByTextAskForMoreTime: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.new.respondByTextAskForMoreTime
        },
        allowedAskForMoreTime: true
      };
    case 'awaitingReasonsForAppealPartial':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.description
        ],
        descriptionParagraphsAskForMoreTime: [
          i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.descriptionAskForMoreTime
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.info.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.info.url
        },
        usefulDocuments: {
          title: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.usefulDocuments.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.usefulDocuments.url
        },
        cta: {
          url: paths.awaitingReasonsForAppeal.decision,
          respondByText: i18n.pages.overviewPage.doThisNext.respondByText,
          respondByTextAskForMoreTime: i18n.pages.overviewPage.doThisNext.awaitingReasonsForAppeal.partial.respondByTextAskForMoreTime
        },
        allowedAskForMoreTime: true
      };
    case 'reasonsForAppealSubmitted':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.reasonsForAppealSubmitted.detailsSent,
          i18n.pages.overviewPage.doThisNext.reasonsForAppealSubmitted.dueDate
        ],
        cta: null,
        allowedAskForMoreTime: false
      };
    case 'awaitingClarifyingQuestionsAnswers':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.clarifyingQuestions.description
        ],
        descriptionParagraphsAskForMoreTime: [
          i18n.pages.overviewPage.doThisNext.clarifyingQuestions.descriptionAskForMoreTime
        ],
        info: null,
        cta: {
          url: paths.awaitingClarifyingQuestionsAnswers.questionsList,
          respondByText: i18n.pages.overviewPage.doThisNext.clarifyingQuestions.respondByText,
          respondByTextAskForMoreTime: i18n.pages.overviewPage.doThisNext.clarifyingQuestions.respondByTextAskForMoreTime
        },
        allowedAskForMoreTime: true
      };
    case 'awaitingCmaRequirements':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.description,
          i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.description2
        ],
        descriptionParagraphsAskForMoreTime: [
          i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.descriptionAskForMoreTime
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.info.title,
          url: i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.info.url
        },
        cta: {
          url: paths.awaitingCmaRequirements.taskList,
          respondByText: i18n.pages.overviewPage.doThisNext.respondByText,
          respondByTextAskForMoreTime: i18n.pages.overviewPage.doThisNext.awaitingCmaRequirements.respondByTextAskForMoreTime
        },
        allowedAskForMoreTime: true
      };
    case 'clarifyingQuestionsAnswersSubmitted':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.clarifyingQuestionsAnswersSubmitted.description,
          i18n.pages.overviewPage.doThisNext.clarifyingQuestionsAnswersSubmitted.dueDate
        ],
        cta: null,
        allowedAskForMoreTime: false
      };
    case'cmaAdjustmentsAgreed':
    case 'cmaRequirementsSubmitted':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.cmaRequirementsSubmitted.description,
          i18n.pages.overviewPage.doThisNext.cmaRequirementsSubmitted.description2
        ],
        info: {
          title: i18n.pages.overviewPage.doThisNext.cmaRequirementsSubmitted.info.title,
          url: i18n.pages.overviewPage.doThisNext.cmaRequirementsSubmitted.info.url
        },
        cta: null,
        allowedAskForMoreTime: false
      };
    case 'cmaListed':
      return {
        descriptionParagraphs: [
          i18n.pages.overviewPage.doThisNext.cmaListed.description,
          i18n.pages.overviewPage.doThisNext.cmaListed.date,
          i18n.pages.overviewPage.doThisNext.cmaListed.time,
          i18n.pages.overviewPage.doThisNext.cmaListed.hearingCentre,
          i18n.pages.overviewPage.doThisNext.cmaListed.respondByTextAskForMoreTime
        ],
        usefulDocuments: {
          title: i18n.pages.overviewPage.doThisNext.cmaListed.usefulDoc.title,
          url: i18n.pages.overviewPage.doThisNext.cmaListed.usefulDoc.url
        },
        info: {
          title: i18n.pages.overviewPage.doThisNext.cmaListed.usefulDocuments.title,
          url: i18n.pages.overviewPage.doThisNext.cmaListed.usefulDocuments.url
        },
        cta: null,
        allowedAskForMoreTime: false
      };
    default:
      // default message to avoid app crashing on events that are to be implemented.
      return {
        descriptionParagraphs: [
          `Description for appeal status <b>${currentAppealStatus}</b> not found`
        ]
      };
  }
}

interface DoThisNextSection {
  descriptionParagraphs: string[];
  usefulDocuments?: {
    title: string;
    url: string;
  };
  info?: {
    title: string,
    url: string;
  };
  cta?: {
    url: string;
    respondByText?: string,
    respondByTextAskForMoreTime?: string;
  };
  allowedAskForMoreTime?: boolean;
  deadline?: string;
  date?: string;
  time?: string;
  hearingCentre?: string;
}

/**
 * Retrieves the information required based on appeal state also known as 'Do This Next' section
 * In the case of Partially saved appeal it will append 'Partial' to the current state
 * e.g 'awaitingReasonsForAppealPartial' which should be defined in APPEAL_STATE.
 * @param req the request containing the session and appeal status
 */
function getAppealApplicationNextStep(req: Request) {
  let currentAppealStatus = req.session.appeal.appealStatus;

  if (isPartiallySavedAppeal(req, currentAppealStatus)) {
    currentAppealStatus = currentAppealStatus + 'Partial';
  }

  let doThisNextSection: DoThisNextSection = getDoThisNextSectionFromAppealState(currentAppealStatus);

  doThisNextSection.deadline = getDeadline(currentAppealStatus, req);
  if (currentAppealStatus === States.CMA_LISTED.id) {
    doThisNextSection.date = getHearingDate(req);
    doThisNextSection.time = getHearingTime(req);
    doThisNextSection.hearingCentre = getHearingCentre(req);
  }
  return doThisNextSection;
}

export {
  getAppealApplicationNextStep
};

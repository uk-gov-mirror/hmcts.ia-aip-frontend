import { NextFunction, Request, Response, Router } from 'express';
import { paths } from '../../paths';
import { Events } from '../../service/ccd-service';
import UpdateAppealService from '../../service/update-appeal-service';

function submitClarifyingQuestions(updateAppealService: UpdateAppealService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session.appeal.clarifyingQuestionsAnswers = req.session.appeal.draftClarifyingQuestionsAnswers;
      await updateAppealService.submitEvent(Events.SUBMIT_CLARIFYING_QUESTION_ANSWERS, req);
      res.redirect(paths.common.overview);
    } catch (error) {
      next(error);
    }
  };
}

function setupSubmitClarifyingQuestionPageController(updateAppealService: UpdateAppealService): Router {
  const router = Router();
  router.get(`/questions-about-appeal/submit`, submitClarifyingQuestions(updateAppealService));
  return router;
}

export {
  setupSubmitClarifyingQuestionPageController,
  submitClarifyingQuestions
};

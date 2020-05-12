import { NextFunction, Request, Response, Router } from 'express';
import { paths } from '../../paths';
import { Events } from '../../service/ccd-service';
import UpdateAppealService from '../../service/update-appeal-service';

function submitClarifyingQuestions(updateAppealService: UpdateAppealService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session.appeal.clarifyingQuestionsAnswers = req.session.appeal.draftClarifyingQuestionsAnswers;
      // req.session.appeal.clarifyingQuestionsAnswers.forEach(answer => {
      //   answer.value.dateSent = '2020-01-01';
      //   answer.value.dueDate = '2020-01-02';
      //   answer.value.dateResponded = '2020-01-03';
      // });
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

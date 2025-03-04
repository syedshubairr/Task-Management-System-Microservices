package com.shah.submission_service.service;

import com.shah.submission_service.model.Submission;
import com.shah.submission_service.model.SubmissionStatus;

import java.util.List;

public interface SubmissionService {
    public Submission submitTask(Long taskId, String githubLink, Long userId, String jwt) throws Exception;

    public Submission getTaskSubmissionById(Long submissionId) throws Exception;

    public List<Submission> getAllTaskSubmissions();

    public List<Submission> getTaskSubmissionByTaskId(Long taskId);

    public Submission acceptDeclineSubmission(Long id, SubmissionStatus status) throws Exception;
}

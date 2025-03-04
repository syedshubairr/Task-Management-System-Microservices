package com.shah.submission_service.service.impl;

import com.shah.submission_service.dto.TaskDto;
import com.shah.submission_service.model.Submission;
import com.shah.submission_service.model.SubmissionStatus;
import com.shah.submission_service.repository.SubmissionRepository;
import com.shah.submission_service.service.SubmissionService;
import com.shah.submission_service.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {
    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private TaskService taskService;

    @Override
    public Submission submitTask(Long taskId, String githubLink, Long userId, String jwt) throws Exception {
        TaskDto task = taskService.getTaskById(taskId, jwt);
        if (task != null) {
            Submission submission = Submission.builder()
                    .taskId(taskId)
                    .userId(userId)
                    .status(SubmissionStatus.PENDING)
                    .githubLink(githubLink)
                    .submissionTime(LocalDateTime.now())
                    .build();
            return submissionRepository.save(submission);
        }
        throw new Exception("Task not found with id: " + taskId);
    }

    @Override
    public Submission getTaskSubmissionById(Long submissionId) throws Exception {
        return submissionRepository.findById(submissionId)
                .orElseThrow(() -> new Exception("Task Submission not found with id: " + submissionId));
    }

    @Override
    public List<Submission> getAllTaskSubmissions() {
        return submissionRepository.findAll();
    }

    @Override
    public List<Submission> getTaskSubmissionByTaskId(Long taskId) {
        return submissionRepository.findByTaskId(taskId);
    }

    @Override
    public Submission acceptDeclineSubmission(Long id, SubmissionStatus status) throws Exception {
        Submission submission = getTaskSubmissionById(id);
        submission.setStatus(status);
        if (status.equals(SubmissionStatus.DONE)) {
            taskService.completeTask(submission.getTaskId());
        }
        return submissionRepository.save(submission);
    }
}

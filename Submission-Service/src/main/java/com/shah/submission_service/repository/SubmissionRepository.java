package com.shah.submission_service.repository;

import com.shah.submission_service.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    public List<Submission> findByTaskId(Long taskId);
}

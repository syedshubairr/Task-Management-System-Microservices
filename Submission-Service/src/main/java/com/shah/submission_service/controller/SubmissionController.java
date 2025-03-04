package com.shah.submission_service.controller;

import com.shah.submission_service.dto.UserDto;
import com.shah.submission_service.model.Submission;
import com.shah.submission_service.model.SubmissionStatus;
import com.shah.submission_service.service.SubmissionService;
import com.shah.submission_service.service.TaskService;
import com.shah.submission_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @PostMapping()
    public ResponseEntity<Submission> submitTask(@RequestParam Long taskId,
                                                 @RequestParam String githubLink,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.submitTask(taskId, githubLink, user.getId(), jwt);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable Long id,
                                                        @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.getTaskSubmissionById(id);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Submission>> getAllSubmission(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> submission = submissionService.getAllTaskSubmissions();
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getSubmissionByTaskId(@PathVariable Long taskId,
                                                                  @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> submission = submissionService.getTaskSubmissionByTaskId(taskId);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Submission> acceptOrDeclineSubmission(@PathVariable Long id,
                                                                @RequestParam("status") SubmissionStatus status,
                                                                @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.acceptDeclineSubmission(id, status);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }
}

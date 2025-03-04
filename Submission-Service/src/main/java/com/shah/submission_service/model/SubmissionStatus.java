package com.shah.submission_service.model;

import lombok.Getter;

@Getter
public enum SubmissionStatus {
    PENDING("PENDING"), DONE("DONE");

    private final String value;

    SubmissionStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}


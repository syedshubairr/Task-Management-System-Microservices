package com.shah.modal;

public enum TaskStatus {
    PENDING("PENDING"),
    ASSIGNED("ASSIGNED"),
    DONE("DONE");

    private final String value;

    TaskStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

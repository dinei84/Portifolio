package com.dinei84.portifolio.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;

import com.dinei84.portifolio.project.service.ProjectNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProjectNotFound(
            ProjectNotFoundException exception,
            ServletWebRequest request) {
        ApiErrorResponse body = new ApiErrorResponse(
                java.time.Instant.now(),
                HttpStatus.NOT_FOUND.value(),
                "PROJECT_NOT_FOUND",
                exception.getMessage(),
                request.getRequest().getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }
}

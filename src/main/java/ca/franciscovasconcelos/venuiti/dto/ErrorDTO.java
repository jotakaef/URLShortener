package ca.franciscovasconcelos.venuiti.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDTO {
    private String id;
    private String description;
    private boolean isError;
}

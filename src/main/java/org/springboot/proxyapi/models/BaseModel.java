package org.springboot.proxyapi.models;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseModel {
    @Id
    private Long id;
    private Date createAt;
    private Date updatedAt;
    private String createdBy;
    private String updatedBy;
}

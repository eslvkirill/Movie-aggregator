package edu.sstu.platform.mapper;

import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileMapper {

  @SneakyThrows
  public byte[] map(MultipartFile multipartFile) {
    return multipartFile.getBytes();
  }
}

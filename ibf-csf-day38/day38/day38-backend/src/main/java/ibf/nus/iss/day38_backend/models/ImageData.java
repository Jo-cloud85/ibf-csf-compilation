package ibf.nus.iss.day38_backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageData {
    
    private String pic_id;
    private byte[] contents;
    private String mediaType;
}

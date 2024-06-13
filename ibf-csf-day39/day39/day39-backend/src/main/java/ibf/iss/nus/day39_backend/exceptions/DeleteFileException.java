package ibf.iss.nus.day39_backend.exceptions;

public class DeleteFileException extends Exception {
    public DeleteFileException(){}

    public DeleteFileException(String msg) {
        super(msg); 
    }
}

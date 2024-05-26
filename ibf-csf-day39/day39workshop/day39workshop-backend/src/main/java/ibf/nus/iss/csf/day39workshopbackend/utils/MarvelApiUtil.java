package ibf.nus.iss.csf.day39workshopbackend.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MarvelApiUtil {
    public static String generateMd5Hash(String ts, String privateKey, String publicKey) {
        try {
            String valueToHash = ts + privateKey + publicKey;
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(valueToHash.getBytes());
            byte[] digest = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}

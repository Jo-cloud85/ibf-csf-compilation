package ibf.nus.iss.csf.day39workshopbackend.repositories;

import java.util.concurrent.TimeUnit;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import ibf.nus.iss.csf.day39workshopbackend.models.MarvelCharacter;
import ibf.nus.iss.csf.day39workshopbackend.utils.RedisUtil;

@Repository
public class MarvelRepository {
    
    @Autowired
    @Qualifier(RedisUtil.REDIS_BEAN)
    RedisTemplate<String, String> redisTemplate;

    HashOperations<String, String, String> hashOps;

    /* I have to talk to the marvel api in the service to return a list of characters that matches the search criteria
    coming from the frontend. Here the main purpose is to get the search result and then save the character details 
    into Redis for 1 hour i.e. cache the result for 1 hour. */

    public void saveCharToRedis(MarvelCharacter character, long expirationSeconds) {
        hashOps = redisTemplate.opsForHash();
        hashOps.putIfAbsent(RedisUtil.KEY_MARVEL_CHARACTERS, character.getId().toString(), character.toString());
        redisTemplate.expire(RedisUtil.KEY_MARVEL_CHARACTERS, expirationSeconds, TimeUnit.SECONDS);
    }

    public MarvelCharacter getCharByIdFrRedis(Integer id) {
        hashOps = redisTemplate.opsForHash();
        String characterStr = hashOps.get(RedisUtil.KEY_MARVEL_CHARACTERS, id.toString());
        return characterStr != null ? jsonToCharacter(characterStr) : null;
    }

    private MarvelCharacter jsonToCharacter(String jsonStr) {
        JSONObject jsonObj = new JSONObject(jsonStr);
        return new MarvelCharacter(
            jsonObj.getInt("id"),
            jsonObj.getString("name"),
            jsonObj.getString("description"),
            jsonObj.getString("thumbnailURL"),
            jsonObj.getString("resourceURI")
        );
    }
}

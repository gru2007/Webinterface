package de.presti.ree6.backend.utils.data.container;

import com.fasterxml.jackson.annotation.JsonFormat;
import de.presti.ree6.backend.bot.BotWorker;
import de.presti.ree6.backend.utils.data.container.user.UserContainer;
import de.presti.ree6.sql.entities.Recording;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.channel.middleman.StandardGuildMessageChannel;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecordContainer {

    String creationTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    long guildId;

    String voiceChannel;
    UserContainer creator;
    String id;

    public RecordContainer(Recording recording) {
        ///this.data = Base64.encodeBase64String(recording.getRecording());
        this.creationTime = String.valueOf(recording.getCreation());
        this.guildId = recording.getGuildId();
        this.creator = new UserContainer(BotWorker.getShardManager().retrieveUserById(recording.getCreatorId()).complete());
        this.id = recording.getIdentifier();

        Guild guild = BotWorker.getShardManager().getGuildById(recording.getGuildId());

        if (guild != null) {
            this.voiceChannel = recording.getVoiceId();
        }
    }
}

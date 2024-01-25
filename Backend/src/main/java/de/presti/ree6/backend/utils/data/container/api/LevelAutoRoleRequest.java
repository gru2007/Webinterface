package de.presti.ree6.backend.utils.data.container.api;

/**
 * Request for the Level Auto Role.
 * @param level Level of the Auto Role.
 * @param role Role ID of the Auto Role.
 */
public record LevelAutoRoleRequest(long level, long role) {
}

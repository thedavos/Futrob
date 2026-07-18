class ExternalClub {
  const ExternalClub({
    required this.providerKey,
    required this.externalClubId,
    required this.name,
    required this.platform,
    required this.gameEdition,
  });

  final String providerKey;
  final String externalClubId;
  final String name;
  final String platform;
  final String gameEdition;

  factory ExternalClub.fromJson(Map<String, Object?> json) {
    return ExternalClub(
      providerKey: json['providerKey']! as String,
      externalClubId: json['externalClubId']! as String,
      name: json['name']! as String,
      platform: json['platform']! as String,
      gameEdition: json['gameEdition']! as String,
    );
  }
}

class ProviderMatchTeam {
  const ProviderMatchTeam({
    required this.externalClubId,
    required this.name,
    required this.goals,
  });

  final String externalClubId;
  final String name;
  final num goals;

  factory ProviderMatchTeam.fromJson(Map<String, Object?> json) {
    return ProviderMatchTeam(
      externalClubId: json['externalClubId']! as String,
      name: json['name']! as String,
      goals: json['goals']! as num,
    );
  }
}

class ProviderPlayerMatchStats {
  const ProviderPlayerMatchStats({
    required this.externalPlayerId,
    required this.displayName,
    required this.goals,
    required this.assists,
    required this.rating,
  });

  final String externalPlayerId;
  final String displayName;
  final num? goals;
  final num? assists;
  final num? rating;

  factory ProviderPlayerMatchStats.fromJson(Map<String, Object?> json) {
    return ProviderPlayerMatchStats(
      externalPlayerId: json['externalPlayerId']! as String,
      displayName: json['displayName']! as String,
      goals: json['goals'] as num?,
      assists: json['assists'] as num?,
      rating: json['rating'] as num?,
    );
  }
}

class ProviderMatch {
  const ProviderMatch({
    required this.id,
    required this.providerKey,
    required this.externalMatchId,
    required this.gameEdition,
    required this.platform,
    required this.mode,
    required this.occurredAt,
    required this.home,
    required this.away,
    required this.players,
    required this.wasDisconnected,
    required this.winnerByForfeit,
    required this.completeness,
    this.durationSeconds,
  });

  final String id;
  final String providerKey;
  final String externalMatchId;
  final String gameEdition;
  final String platform;
  final String mode;
  final DateTime occurredAt;
  final ProviderMatchTeam home;
  final ProviderMatchTeam away;
  final List<ProviderPlayerMatchStats> players;
  final num? durationSeconds;
  final bool wasDisconnected;
  final bool winnerByForfeit;
  final String completeness;

  factory ProviderMatch.fromJson(Map<String, Object?> json) {
    final provider = json['provider']! as Map<String, Object?>;
    final game = json['game']! as Map<String, Object?>;
    final metadata = json['metadata']! as Map<String, Object?>;
    final playersJson = json['players']! as List<Object?>;

    return ProviderMatch(
      id: json['id']! as String,
      providerKey: provider['key']! as String,
      externalMatchId: provider['externalMatchId']! as String,
      gameEdition: game['edition']! as String,
      platform: game['platform']! as String,
      mode: game['mode']! as String,
      occurredAt: DateTime.parse(json['occurredAt']! as String),
      home: ProviderMatchTeam.fromJson(json['home']! as Map<String, Object?>),
      away: ProviderMatchTeam.fromJson(json['away']! as Map<String, Object?>),
      players: playersJson
          .map((item) =>
              ProviderPlayerMatchStats.fromJson(item! as Map<String, Object?>))
          .toList(),
      durationSeconds: metadata['durationSeconds'] as num?,
      wasDisconnected: metadata['wasDisconnected']! as bool,
      winnerByForfeit: metadata['winnerByForfeit']! as bool,
      completeness: metadata['completeness']! as String,
    );
  }
}

class SearchClubsResponse {
  const SearchClubsResponse({required this.clubs});

  final List<ExternalClub> clubs;

  factory SearchClubsResponse.fromJson(Map<String, Object?> json) {
    final clubs = (json['clubs']! as List<Object?>)
        .map((item) => ExternalClub.fromJson(item! as Map<String, Object?>))
        .toList();
    return SearchClubsResponse(clubs: clubs);
  }
}

class GetClubMatchesResponse {
  const GetClubMatchesResponse({required this.matches});

  final List<ProviderMatch> matches;

  factory GetClubMatchesResponse.fromJson(Map<String, Object?> json) {
    final matches = (json['matches']! as List<Object?>)
        .map((item) => ProviderMatch.fromJson(item! as Map<String, Object?>))
        .toList();
    return GetClubMatchesResponse(matches: matches);
  }
}

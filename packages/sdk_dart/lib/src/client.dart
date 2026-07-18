import 'dart:convert';

import 'package:http/http.dart' as http;

import 'errors.dart';
import 'models.dart';

typedef AccessTokenGetter = Future<String?> Function();

class FutrobClient {
  FutrobClient({
    required String baseUrl,
    AccessTokenGetter? getAccessToken,
    http.Client? httpClient,
  })  : _baseUrl = baseUrl.replaceAll(RegExp(r'/$'), ''),
        _getAccessToken = getAccessToken,
        _http = httpClient ?? http.Client();

  final String _baseUrl;
  final AccessTokenGetter? _getAccessToken;
  final http.Client _http;

  late final meta = _MetaResource(this);
  late final gameData = _GameDataResource(this);

  Future<T> _request<T>({
    required String method,
    required String path,
    required T Function(Object? data) parse,
  }) async {
    final headers = <String, String>{'Accept': 'application/json'};
    final token = _getAccessToken == null ? null : await _getAccessToken();
    if (token != null && token.isNotEmpty) {
      headers['Authorization'] = 'Bearer $token';
    }

    final uri = Uri.parse('$_baseUrl$path');
    late final http.Response response;
    if (method == 'GET') {
      response = await _http.get(uri, headers: headers);
    } else {
      final streamed =
          await _http.send(http.Request(method, uri)..headers.addAll(headers));
      response = await http.Response.fromStream(streamed);
    }

    Object? data;
    try {
      data = response.body.isEmpty ? null : jsonDecode(response.body);
    } catch (_) {
      data = null;
    }

    if (response.statusCode < 200 || response.statusCode >= 300) {
      if (data is Map) {
        final map = Map<String, Object?>.from(data);
        throw FutrobApiException(
          status: response.statusCode,
          code: map['code'] as String? ?? 'sdk.http_error',
          messageKey: map['messageKey'] as String? ?? 'errors.http',
          details: map['details'] is Map
              ? Map<String, Object?>.from(map['details']! as Map)
              : null,
        );
      }
      throw FutrobApiException(
        status: response.statusCode,
        code: 'sdk.http_error',
        messageKey: 'errors.http',
      );
    }

    return parse(data);
  }
}

class _MetaResource {
  _MetaResource(this._client);

  final FutrobClient _client;

  Future<Map<String, Object?>> ping() {
    return _client._request(
      method: 'GET',
      path: '/meta/ping',
      parse: (data) => Map<String, Object?>.from(data! as Map),
    );
  }
}

class _GameDataResource {
  _GameDataResource(this._client);

  final FutrobClient _client;

  late final clubs = _ClubsResource(_client);
}

class _ClubsResource {
  _ClubsResource(this._client);

  final FutrobClient _client;

  Future<SearchClubsResponse> search({
    required String query,
    String providerKey = 'ea-clubs',
    String platform = 'common-gen5',
    String gameEdition = 'fc26',
  }) {
    final params = {
      'query': query,
      'providerKey': providerKey,
      'platform': platform,
      'gameEdition': gameEdition,
    };
    final qs = Uri(queryParameters: params).query;
    return _client._request(
      method: 'GET',
      path: '/game-data/clubs/search?$qs',
      parse: (data) =>
          SearchClubsResponse.fromJson(Map<String, Object?>.from(data! as Map)),
    );
  }

  Future<ExternalClub> retrieve(
    String externalClubId, {
    String providerKey = 'ea-clubs',
    String platform = 'common-gen5',
    String gameEdition = 'fc26',
  }) {
    final params = {
      'providerKey': providerKey,
      'platform': platform,
      'gameEdition': gameEdition,
    };
    final qs = Uri(queryParameters: params).query;
    final id = Uri.encodeComponent(externalClubId);
    return _client._request(
      method: 'GET',
      path: '/game-data/clubs/$id?$qs',
      parse: (data) =>
          ExternalClub.fromJson(Map<String, Object?>.from(data! as Map)),
    );
  }

  Future<GetClubMatchesResponse> matches(
    String externalClubId, {
    String providerKey = 'ea-clubs',
    String platform = 'common-gen5',
    String gameEdition = 'fc26',
    String matchType = 'friendlyMatch',
    int maxResultCount = 50,
  }) {
    final params = {
      'providerKey': providerKey,
      'platform': platform,
      'gameEdition': gameEdition,
      'matchType': matchType,
      'maxResultCount': '$maxResultCount',
    };
    final qs = Uri(queryParameters: params).query;
    final id = Uri.encodeComponent(externalClubId);
    return _client._request(
      method: 'GET',
      path: '/game-data/clubs/$id/matches?$qs',
      parse: (data) => GetClubMatchesResponse.fromJson(
          Map<String, Object?>.from(data! as Map)),
    );
  }
}

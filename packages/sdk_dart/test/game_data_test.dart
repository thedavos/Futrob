import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:test/test.dart';

import 'package:futrob_sdk/futrob_sdk.dart';

void main() {
  test('gameData.clubs.search hits Futrob path', () async {
    late Uri seen;
    final client = FutrobClient(
      baseUrl: 'https://app.example.com/api/v1',
      httpClient: MockClient((request) async {
        seen = request.url;
        return http.Response(
          jsonEncode({
            'clubs': [
              {
                'providerKey': 'ea-clubs',
                'externalClubId': '10754',
                'name': 'Fera Enjaulada',
                'platform': 'common-gen5',
                'gameEdition': 'fc26',
              },
            ],
          }),
          200,
          headers: {'content-type': 'application/json'},
        );
      }),
    );

    final result = await client.gameData.clubs.search(query: 'Fera');
    expect(seen.path, '/api/v1/game-data/clubs/search');
    expect(seen.queryParameters['query'], 'Fera');
    expect(result.clubs.single.externalClubId, '10754');
  });
}

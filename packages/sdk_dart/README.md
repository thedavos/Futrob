# @futrob Dart SDK

Stainless-style HTTP client for Futrob private `/api/v1`.

Talks only to Futrob. Never calls EA Clubs directly.

```dart
final client = FutrobClient(
  baseUrl: 'https://app.example.com/api/v1',
  getAccessToken: () async => token,
);

final clubs = await client.gameData.clubs.search(query: 'Fera');
```

See `/packages/README.md`.

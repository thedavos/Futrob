class FutrobApiException implements Exception {
  FutrobApiException({
    required this.status,
    required this.code,
    required this.messageKey,
    this.details,
  });

  final int status;
  final String code;
  final String messageKey;
  final Map<String, Object?>? details;

  @override
  String toString() => 'FutrobApiException($status $code: $messageKey)';
}

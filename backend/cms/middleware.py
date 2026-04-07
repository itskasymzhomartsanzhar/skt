from django.conf import settings
from django.http import HttpResponse


class SimpleCORSMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get("Origin")
        is_api_request = request.path.startswith("/api/")
        allow_origin = (
            origin
            and origin in getattr(settings, "CORS_ALLOWED_ORIGINS", [])
            and is_api_request
        )

        if allow_origin and request.method == "OPTIONS":
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        if allow_origin:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"

            vary_header = response.get("Vary")
            if vary_header:
                if "Origin" not in vary_header:
                    response["Vary"] = f"{vary_header}, Origin"
            else:
                response["Vary"] = "Origin"

        return response

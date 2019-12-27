using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helpers {

    public static class Extensions {

        public static void AddApplicationError(this HttpResponse response, string message) {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add(HeaderNames.AccessControlExposeHeaders, "Application-Error");
            response.Headers.Add(HeaderNames.AccessControlAllowOrigin, "*");
        }

        public static int CalculateAge(this DateTime theDateTime) {
            var age = DateTime.Today.Year - theDateTime.Year;

            if (theDateTime.AddYears(age) > DateTime.Today) {
                age--;
            }

            return age;
        }

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages) {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add(HeaderNames.AccessControlExposeHeaders, "Pagination");
        }
        
    }

}

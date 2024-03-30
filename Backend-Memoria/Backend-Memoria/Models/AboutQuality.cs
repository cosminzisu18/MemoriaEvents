using System.Text.Json.Serialization;

namespace Backend_Memoria.Models
{
    public class AboutQuality
    {
        public int Id { get; set; }
        public string IconQualities { get; set; }
        public string TitleQualities { get; set; }
        public string TextQualities { get; set; }
        public string ImageUrl { get; set; }
        public int AboutId { get; set; }
        [JsonIgnore]
        public About About { get; set; }
    }
}

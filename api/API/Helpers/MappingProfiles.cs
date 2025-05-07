using System;
using API.DTOs.CommuneDto;
using API.DTOs.DeviseDto;
using API.DTOs.EquipementDto;
using API.DTOs.ListingDto;
using API.DTOs.RuleDto;
using API.DTOs.TauxChangeDto;
using API.DTOs.TypehebergementDto;
using API.DTOs.VilleDto;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Ville, VilleRequest>().ReverseMap();
        CreateMap<Commune, CommuneRequest>().ReverseMap();
        CreateMap<Commune, CommuneResponse>()
                            .ForMember(d => d.Ville, o => o.MapFrom(s => s.Ville.Designation))
                            .ReverseMap();
        CreateMap<Devise, DeviseRequest>().ReverseMap();
        CreateMap<Equipement, EquipementRequest>().ReverseMap();
        CreateMap<TypeHebergement, TypeHebergementRequest>().ReverseMap();
        CreateMap<Rule, RuleRequest>().ReverseMap();
        CreateMap<TauxChange, TauxChangeRequest>().ReverseMap();

        //Listing 
        CreateMap<Listing, ListingResponse>()
           .ForMember(dest => dest.TypeHebergement, opt => opt.MapFrom(src => src.TypeHebergement!.Designation))
           .ForMember(dest => dest.Equipements, opt => opt.MapFrom(src => src.Equipements.Select(e => e.Equipement)))
           .ForMember(dest => dest.Rules, opt => opt.MapFrom(src => src.Rules))
           .ForMember(dest => dest.PhotoUrls, opt => opt.MapFrom(src => src.Photos.Select(p => p.PhotoUrl)));

        // CreateMap<ListingPhoto, string>().ConvertUsing(p => p.PhotoUrl);
        CreateMap<ListingPrice, ListingPriceResponse>()
            .ForMember(dest => dest.CodeDevise, opt => opt.MapFrom(src => src.Devise!.Code));

        CreateMap<ListingLocation, ListingLocationResponse>()
            .ForMember(dest => dest.Ville, opt => opt.MapFrom(src => src.Ville!.Designation))
            .ForMember(dest => dest.Commune, opt => opt.MapFrom(src => src.Commune!.Designation));

        CreateMap<Equipement, EquipementResponse>()
            .ForMember(dest => dest.Nom, opt => opt.MapFrom(src => src.Designation))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        CreateMap<ListingRule, RuleResponse>()
            .ForMember(dest => dest.Nom, opt => opt.MapFrom(src => src.Rule!.libelle));
    }
}

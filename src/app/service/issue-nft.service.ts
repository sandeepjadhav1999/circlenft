import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { issueNft } from '../model/issue-nft';
import { Observable } from 'rxjs';
import { skillsBadge } from '../model/skill-badges';

@Injectable({
  providedIn: 'root'
})
export class IssueNftService {
  isSwitching:boolean=true

  urlPrefix: string = "http://localhost:3001";

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<issueNft[]>
  {
    return this.httpClient.get<issueNft[]>(this.urlPrefix + "/nft/retrieveAllNFTs")
  }

  insertProject(newProject: issueNft): Observable<issueNft>
  {
    return this.httpClient.post<issueNft>(this.urlPrefix + "/nft/issueNFT", newProject);
  }
  getuserbyuserName(firstName:issueNft):Observable<issueNft>
  {
    return this.httpClient.get<issueNft>(this.urlPrefix+"/nft/getNftsByUser/"+firstName,{responseType:"json"})
  }

  getHistorybynftId(nftId:issueNft):Observable<issueNft>
  {
    return this.httpClient.get<issueNft>(this.urlPrefix+"/nft/history/"+nftId,{responseType:"json"})
  }
  
  validateNft(newProject: issueNft): Observable<issueNft>
  {
    return this.httpClient.post<issueNft>(this.urlPrefix + "/nft/validateNft", newProject)  
  }

  expireNft(expireNft:any): Observable<issueNft>
  {
    return this.httpClient.post<issueNft>(this.urlPrefix + "/nft/expireNft", expireNft)  
  }

  getSkillBadges(): Observable<skillsBadge[]>
  {
    return this.httpClient.get<skillsBadge[]>(this.urlPrefix + "/api/Skillbadge")
  }

}
